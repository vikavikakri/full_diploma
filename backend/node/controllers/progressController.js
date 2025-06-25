const db = require('../db');

const getProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('getProgress - userId:', userId);

    const profileResult = await db.query(
      'SELECT active_courses, points, achievements FROM user_profiles WHERE user_id = $1',
      [userId]
    );
    console.log('profileResult raw:', profileResult.rows);

    if (profileResult.rows.length === 0) {
      return res.status(404).json({ error: 'Профиль не найден' });
    }

    const profile = profileResult.rows[0];
    let activeCourses = Array.isArray(profile.active_courses)
      ? profile.active_courses
      : typeof profile.active_courses === 'string'
      ? JSON.parse(profile.active_courses || '[]')
      : [];
    const points = profile.points || 0;
    let achievements = Array.isArray(profile.achievements)
      ? profile.achievements
      : typeof profile.achievements === 'string'
      ? JSON.parse(profile.achievements || '[]')
      : [];

    console.log('Parsed activeCourses:', activeCourses);
    console.log('Parsed achievements:', achievements);
    console.log('Current points:', points);

    if (!Array.isArray(activeCourses)) {
      activeCourses = [];
    }

    const coursesResult = await db.query('SELECT id, total_lessons FROM courses');
    const coursesMap = coursesResult.rows.reduce((map, course) => {
      map[course.id] = course.total_lessons;
      return map;
    }, {});

    activeCourses = activeCourses.map((course) => {
      const totalLessons = coursesMap[course.course_id] || 15;
      const completedLessons = course.completed_lessons || [];
      const progress = Math.ceil((completedLessons.length / totalLessons) * 100);

      let testProgress = 0;
      if (course.tests && Array.isArray(course.tests)) {
        const latestTest = course.tests.reduce((max, test) => max.attempts > test.attempts ? max : test, { score: 0 });
        testProgress = latestTest.score ? Math.ceil((latestTest.score / 11) * 100) : 0;
      }

      return { ...course, progress, test_progress: testProgress };
    });

    res.json({ active_courses: activeCourses, points, achievements });
  } catch (error) {
    console.error('Ошибка при получении прогресса:', error.stack);
    res.status(500).json({ error: 'Ошибка сервера', details: error.message });
  }
};

const updateProgress = async (req, res) => {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    const userId = req.user.id;
    const { course_id, lesson_number, repeat, xp_reward, xp_deduct, test_attempt, test_id, score } = req.body;
    const startTime = new Date();
    console.log(
      'updateProgress - userId:', userId,
      'course_id:', course_id,
      'lesson_number:', lesson_number,
      'xp_deduct:', xp_deduct,
      'test_attempt:', test_attempt,
      'test_id:', test_id,
      'score:', score,
      'Timestamp:', startTime.toISOString()
    );

    const lessonResult = await client.query(
      'SELECT xp_reward FROM lessons WHERE course_id = $1 AND lesson_number = $2',
      [course_id, lesson_number]
    );
    console.log('lessonResult raw:', lessonResult.rows);

    if (lessonResult.rows.length === 0 && lesson_number) {
      throw new Error('Урок не найден');
    }

    const xpReward = lessonResult.rows[0]?.xp_reward || 0;
    console.log('xpReward:', xpReward);

    const profileResult = await client.query(
      'SELECT active_courses, points, achievements FROM user_profiles WHERE user_id = $1',
      [userId]
    );
    console.log('profileResult raw:', profileResult.rows);

    if (profileResult.rows.length === 0) {
      throw new Error('Профиль не найден');
    }

    let profile = profileResult.rows[0];
    let activeCourses = Array.isArray(profile.active_courses)
      ? profile.active_courses
      : typeof profile.active_courses === 'string'
      ? JSON.parse(profile.active_courses || '[]')
      : [];
    let points = profile.points || 0;
    let achievements = Array.isArray(profile.achievements)
      ? profile.achievements
      : typeof profile.achievements === 'string'
      ? JSON.parse(profile.achievements || '[]')
      : [];

    console.log('Parsed activeCourses:', activeCourses);
    console.log('Parsed achievements:', achievements);
    console.log('Initial points:', points);

    if (!Array.isArray(activeCourses)) {
      activeCourses = [];
    }

    if (test_attempt && test_id !== undefined) {
      const courseProgress = activeCourses.find((course) => course.course_id === course_id);
      if (!courseProgress) {
        throw new Error('Курс не найден');
      }

      if (!courseProgress.tests || !Array.isArray(courseProgress.tests)) {
        courseProgress.tests = [];
        console.log('Initialized tests array for course:', course_id);
      }

      let testRecord = courseProgress.tests.find((test) => test.test_id === test_id);
      if (!testRecord) {
        testRecord = { test_id, attempts: 0, score: 0, date: new Date().toISOString() };
        courseProgress.tests.push(testRecord);
        console.log('Created new test record:', testRecord);
      }

      testRecord.attempts += 1;
      if (score !== undefined) testRecord.score = score; // Обновляем score только если он передан
      testRecord.date = new Date().toISOString();
      console.log('Updated test record:', testRecord);

      const deductAmount = xp_deduct || 250;
      console.log('Deduct amount:', deductAmount);
      if (points < deductAmount) {
        throw new Error('Недостаточно XP');
      }
      points -= deductAmount;
      console.log('Points after deduction:', points);

      await client.query(
        'UPDATE user_profiles SET active_courses = $1, points = $2 WHERE user_id = $3',
        [JSON.stringify(activeCourses), points, userId]
      );
      console.log('Updated active_courses in DB:', JSON.stringify(activeCourses));

      await client.query('COMMIT');
      return res.json({
        message: 'Прогресс теста обновлён',
        points,
        active_courses: activeCourses,
        achievements
      });
    }

    // Логика для уроков (оставляем без изменений)
    let courseProgress = activeCourses.find((course) => course.course_id === course_id);
    if (!courseProgress) {
      const courseResult = await client.query(
        'SELECT name FROM courses WHERE id = $1',
        [course_id]
      );
      courseProgress = {
        course_id,
        name: courseResult.rows[0]?.name || 'Unknown Course',
        completed_lessons: [],
      };
      activeCourses.push(courseProgress);
    }

    const alreadyCompleted = courseProgress.completed_lessons.includes(lesson_number);
    const xpToAdd = alreadyCompleted && repeat ? 25 : xp_reward || xpReward;

    if (!alreadyCompleted || repeat) {
      if (!alreadyCompleted) {
        courseProgress.completed_lessons.push(lesson_number);
        courseProgress.completed_lessons.sort((a, b) => a - b);
      }
      points += xpToAdd;
      console.log('Points after lesson:', points);
    }

    // Логика достижений (оставляем без изменений)
    const newAchievements = [];
    const totalLessons = (await client.query('SELECT total_lessons FROM courses WHERE id = $1', [course_id])).rows[0].total_lessons;
    // ... (остальная логика достижений)

    if (newAchievements.length > 0) {
      achievements = [...achievements, ...newAchievements];
      const totalXpFromAchievements = newAchievements.reduce((sum, a) => sum + a.xp_reward, 0);
      points += totalXpFromAchievements;
      await client.query(
        'UPDATE user_profiles SET active_courses = $1, points = $2, achievements = $3 WHERE user_id = $4',
        [JSON.stringify(activeCourses), points, JSON.stringify(achievements), userId]
      );
    } else {
      await client.query(
        'UPDATE user_profiles SET active_courses = $1, points = $2 WHERE user_id = $3',
        [JSON.stringify(activeCourses), points, userId]
      );
    }

    await client.query('COMMIT');
    res.json({
      message: 'Прогресс обновлен',
      xp_added: xpToAdd,
      points,
      new_achievements: newAchievements,
      achievements,
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Ошибка при обновлении прогресса:', error.stack);
    if (error.message === 'Недостаточно XP') {
      res.status(400).json({ error: 'Недостаточно XP' });
    } else if (error.message === 'Урок не найден' || error.message === 'Курс не найден' || error.message === 'Профиль не найден') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Ошибка сервера', details: error.message });
    }
  } finally {
    client.release();
  }
};

module.exports = {
  getProgress,
  updateProgress,
};