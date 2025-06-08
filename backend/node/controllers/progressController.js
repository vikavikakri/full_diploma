const db = require('../db');

// Получение прогресса пользователя
const getProgress = async(req, res) => {
    try {
        const userId = req.user.id;
        console.log('getProgress - userId:', userId);

        const profileResult = await db.query(
            'SELECT active_courses, points FROM user_profiles WHERE user_id = $1', [userId]
        );
        console.log('profileResult:', profileResult.rows);

        if (profileResult.rows.length === 0) {
            return res.status(404).json({ error: 'Профиль не найден' });
        }

        const profile = profileResult.rows[0];
        let activeCourses = Array.isArray(profile.active_courses) ?
            profile.active_courses :
            (typeof profile.active_courses === 'string' ?
                JSON.parse(profile.active_courses || '[]') :
                (profile.active_courses || []));
        const points = profile.points || 0;

        // Убедимся, что activeCourses — это массив
        if (!Array.isArray(activeCourses)) {
            activeCourses = [];
        }

        // Добавим progress для каждого курса
        activeCourses = activeCourses.map((course) => {
            const totalLessons = 6; // Для курса Python
            const completedLessons = course.completed_lessons || [];
            const progress = Math.ceil((completedLessons.length / totalLessons) * 100);
            return {...course, progress };
        });

        res.json({ active_courses: activeCourses, points });
    } catch (error) {
        console.error('Ошибка при получении прогресса:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};

// Обновление прогресса пользователя
const updateProgress = async(req, res) => {
    try {
        const userId = req.user.id;
        const { course_id, lesson_number } = req.body;
        console.log('updateProgress - userId:', userId, 'course_id:', course_id, 'lesson_number:', lesson_number);

        // Получаем информацию об уроке
        const lessonResult = await db.query(
            'SELECT xp_reward FROM lessons WHERE course_id = $1 AND lesson_number = $2', [course_id, lesson_number]
        );
        console.log('lessonResult:', lessonResult.rows);

        if (lessonResult.rows.length === 0) {
            return res.status(404).json({ error: 'Урок не найден' });
        }

        const xpReward = lessonResult.rows[0].xp_reward;
        console.log('xpReward:', xpReward);

        // Получаем текущий профиль
        const profileResult = await db.query(
            'SELECT active_courses, points FROM user_profiles WHERE user_id = $1', [userId]
        );
        console.log('profileResult:', profileResult.rows);

        if (profileResult.rows.length === 0) {
            return res.status(404).json({ error: 'Профиль не найден' });
        }

        const profile = profileResult.rows[0];
        let activeCourses = Array.isArray(profile.active_courses) ?
            profile.active_courses :
            (typeof profile.active_courses === 'string' ?
                JSON.parse(profile.active_courses || '[]') :
                (profile.active_courses || []));
        let points = profile.points || 0;
        console.log('activeCourses before update:', activeCourses);

        // Убедимся, что activeCourses — это массив
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
        }

        points += xpToAdd;
        console.log('activeCourses after update:', activeCourses, 'points:', points);

        // Обновляем профиль
        await db.query(
            'UPDATE user_profiles SET active_courses = $1, points = $2 WHERE user_id = $3', [JSON.stringify(activeCourses), points, userId]
        );

        res.json({ message: 'Прогресс обновлен', xp_added: xpToAdd, points });
    } catch (error) {
        console.error('Ошибка при обновлении прогресса:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};

module.exports = {
    getProgress,
    updateProgress,
};