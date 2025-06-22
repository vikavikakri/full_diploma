const db = require('../db');

// Получение прогресса пользователя
const getProgress = async(req, res) => {
    try {
        const userId = req.user.id;
        console.log('getProgress - userId:', userId);

        const profileResult = await db.query(
            'SELECT active_courses, points, achievements FROM user_profiles WHERE user_id = $1', [userId]
        );
        console.log('profileResult raw:', profileResult.rows);

        if (profileResult.rows.length === 0) {
            return res.status(404).json({ error: 'Профиль не найден' });
        }

        const profile = profileResult.rows[0];
        let activeCourses = Array.isArray(profile.active_courses) ?
            profile.active_courses :
            typeof profile.active_courses === 'string' ?
            JSON.parse(profile.active_courses || '[]') : [];
        const points = profile.points || 0;
        let achievements = Array.isArray(profile.achievements) ?
            profile.achievements :
            typeof profile.achievements === 'string' ?
            JSON.parse(profile.achievements || '[]') : [];

        console.log('Parsed activeCourses:', activeCourses);
        console.log('Parsed achievements:', achievements);
        console.log('Current points:', points);

        if (!Array.isArray(activeCourses)) {
            activeCourses = [];
        }

        activeCourses = activeCourses.map((course) => {
            const totalLessons = 15; // Для курса Python
            const completedLessons = course.completed_lessons || [];
            const progress = Math.ceil((completedLessons.length / totalLessons) * 100);
            return {...course, progress };
        });

        res.json({ active_courses: activeCourses, points, achievements });
    } catch (error) {
        console.error('Ошибка при получении прогресса:', error.stack);
        res.status(500).json({ error: 'Ошибка сервера', details: error.message });
    }
};

// Обновление прогресса пользователя и проверка ачивок
const updateProgress = async(req, res) => {
    try {
        const userId = req.user.id;
        const { course_id, lesson_number } = req.body;
        const startTime = new Date(); // Для проверки времени
        console.log('updateProgress - userId:', userId, 'course_id:', course_id, 'lesson_number:', lesson_number);

        // Получаем информацию об уроке
        const lessonResult = await db.query(
            'SELECT xp_reward FROM lessons WHERE course_id = $1 AND lesson_number = $2', [course_id, lesson_number]
        );
        console.log('lessonResult raw:', lessonResult.rows);

        if (lessonResult.rows.length === 0) {
            return res.status(404).json({ error: 'Урок не найден' });
        }

        const xpReward = lessonResult.rows[0].xp_reward;
        console.log('xpReward:', xpReward);

        // Получаем текущий профиль
        const profileResult = await db.query(
            'SELECT active_courses, points, achievements FROM user_profiles WHERE user_id = $1', [userId]
        );
        console.log('profileResult raw:', profileResult.rows);

        if (profileResult.rows.length === 0) {
            return res.status(404).json({ error: 'Профиль не найден' });
        }

        const profile = profileResult.rows[0];
        let activeCourses = Array.isArray(profile.active_courses) ?
            profile.active_courses :
            typeof profile.active_courses === 'string' ?
            JSON.parse(profile.active_courses || '[]') : [];
        let points = profile.points || 0;
        let achievements = Array.isArray(profile.achievements) ?
            profile.achievements :
            typeof profile.achievements === 'string' ?
            JSON.parse(profile.achievements || '[]') : [];

        console.log('Parsed activeCourses:', activeCourses);
        console.log('Parsed achievements:', achievements);
        console.log('Initial points:', points);

        if (!Array.isArray(activeCourses)) {
            activeCourses = [];
        }

        // Находим или создаем запись о курсе
        let courseProgress = activeCourses.find((course) => course.course_id === course_id);
        if (!courseProgress) {
            courseProgress = { course_id, name: 'Python', completed_lessons: [] };
            activeCourses.push(courseProgress);
        }

        // Проверяем, был ли урок уже пройден
        const alreadyCompleted = courseProgress.completed_lessons.includes(lesson_number);
        const xpToAdd = alreadyCompleted ? 25 : xpReward;

        if (!alreadyCompleted) {
            courseProgress.completed_lessons.push(lesson_number);
            courseProgress.completed_lessons.sort((a, b) => a - b); // Сортируем для проверки порядка
        }

        points += xpToAdd;
        console.log('Points after lesson:', points);

        // Проверка ачивок
        const newAchievements = [];
        // 2. Первый шаг к звездам
        if (courseProgress.completed_lessons.length === 1 && !achievements.some(a => a.id === 2)) {
            newAchievements.push({ id: 2, name: 'Первый шаг к звездам', description: 'Завершение первого урока любого предмета', xp_reward: 20, date_earned: new Date() });
        }
        // 3. Триумф новичка
        if (courseProgress.completed_lessons.length >= 3 && !achievements.some(a => a.id === 3)) {
            const lessons = courseProgress.completed_lessons;
            let consecutive = true;
            for (let i = 1; i < lessons.length; i++) {
                if (lessons[i] !== lessons[i - 1] + 1) {
                    consecutive = false;
                    break;
                }
            }
            if (consecutive) {
                newAchievements.push({ id: 3, name: 'Триумф новичка', description: 'Пройти 3 урока подряд', xp_reward: 50, date_earned: new Date() });
            }
        }
        // 4. Марафон знаний
        if (courseProgress.completed_lessons.length === 6 && !achievements.some(a => a.id === 4)) {
            newAchievements.push({ id: 4, name: 'Марафон знаний', description: 'Завершение полного курса одного предмета', xp_reward: 100, date_earned: new Date() });
        }
        // 5. Мультимастер
        const uniqueCourses = activeCourses.filter(c => c.completed_lessons.length > 0).length;
        if (uniqueCourses >= 3 && !achievements.some(a => a.id === 5)) {
            newAchievements.push({ id: 5, name: 'Мультимастер', description: 'Завершение по одному уроку в 3 разных предметах', xp_reward: 70, date_earned: new Date() });
        }
        // 6. Гуру семи наук
        if (uniqueCourses >= 7 && !achievements.some(a => a.id === 6)) {
            newAchievements.push({ id: 6, name: 'Гуру семи наук', description: 'Завершение хотя бы одного урока по всем 7 предметам', xp_reward: 150, date_earned: new Date() });
        }
        // 7. Сборщик XP
        if (points >= 300 && !achievements.some(a => a.id === 7)) {
            newAchievements.push({ id: 7, name: 'Сборщик XP', description: 'Накопление 300 XP', xp_reward: 30, date_earned: new Date() });
        }
        // 8. Легенда опыта
        if (points >= 1000 && !achievements.some(a => a.id === 8)) {
            newAchievements.push({ id: 8, name: 'Легенда опыта', description: 'Накопление 1000 XP', xp_reward: 100, date_earned: new Date() });
        }
        // 9. Решатель головоломок
        if (lesson_number === 3 && !achievements.some(a => a.id === 9)) {
            newAchievements.push({ id: 9, name: 'Решатель головоломок', description: 'Успешное выполнение сложной задачи', xp_reward: 40, date_earned: new Date() });
        }
        // 10. Гений с первого раза
        if (!alreadyCompleted && !achievements.some(a => a.id === 10)) {
            newAchievements.push({ id: 10, name: 'Гений с первого раза', description: 'Пройти тест или задачу с первой попытки', xp_reward: 60, date_earned: new Date() });
        }
        // 11. Мастер точности
        let firstAttempts = achievements.filter(a => [10, 11].includes(a.id)).length;
        if (firstAttempts >= 5 && !achievements.some(a => a.id === 11)) {
            newAchievements.push({ id: 11, name: 'Мастер точности', description: 'Пройти 5 тестов с первого раза', xp_reward: 120, date_earned: new Date() });
        }
        // 12. Молния кода
        const timeTaken = (new Date() - startTime) / 1000 / 60; // В минутах
        if (timeTaken < 5 && !achievements.some(a => a.id === 12)) {
            newAchievements.push({ id: 12, name: 'Молния кода', description: 'Завершить урок менее чем за 5 минут', xp_reward: 25, date_earned: new Date() });
        }
        // 14. Ночной кодер
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 6 && !achievements.some(a => a.id === 14)) {
            newAchievements.push({ id: 14, name: 'Ночной кодер', description: 'Завершить урок между 00:00 и 06:00', xp_reward: 30, date_earned: new Date() });
        }

        if (newAchievements.length > 0) {
            achievements = [...achievements, ...newAchievements];
            const totalXpFromAchievements = newAchievements.reduce((sum, a) => sum + a.xp_reward, 0);
            points += totalXpFromAchievements; // Начисляем XP за ачивки
            console.log('New achievements:', newAchievements, 'Total XP from achievements:', totalXpFromAchievements, 'New points:', points);
            await db.query(
                'UPDATE user_profiles SET active_courses = $1, points = $2, achievements = $3 WHERE user_id = $4', [JSON.stringify(activeCourses), points, JSON.stringify(achievements), userId]
            );
        } else {
            await db.query(
                'UPDATE user_profiles SET active_courses = $1, points = $2 WHERE user_id = $3', [JSON.stringify(activeCourses), points, userId]
            );
        }

        res.json({
            message: 'Прогресс обновлен',
            xp_added: xpToAdd,
            points,
            new_achievements: newAchievements,
            achievements
        });
    } catch (error) {
        console.error('Ошибка при обновлении прогресса:', error.stack); // Полный стек ошибки
        res.status(500).json({ error: 'Ошибка сервера', details: error.message });
    }
};

module.exports = {
    getProgress,
    updateProgress,
};