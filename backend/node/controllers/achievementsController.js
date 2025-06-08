// backend/node/controllers/achievementsController.js
const pool = require('../db');

const getAchievements = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, description, xp_reward FROM achievements');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const checkAchievements = async (req, res) => {
  const { userId, progress, xp } = req.body;

  try {
    const userResult = await pool.query('SELECT achievements, xp FROM users WHERE id = $1', [userId]);
    const user = userResult.rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });

    let currentAchievements = user.achievements || [];
    let currentXp = user.xp || 0;
    const newXp = currentXp + xp;

    let newAchievements = [];
    const allAchievements = await pool.query('SELECT * FROM achievements');

    for (const achievement of allAchievements.rows) {
      switch (achievement.name) {
        case 'Новичок на борту':
          if (currentAchievements.length === 0 && !currentAchievements.includes(achievement.name)) {
            newAchievements.push(achievement.name);
          }
          break;
        case 'Первый шаг к звездам':
          if (progress.completedLessons.length >= 1 && !currentAchievements.includes(achievement.name)) {
            newAchievements.push(achievement.name);
          }
          break;
        case 'Триумф новичка':
          if (progress.completedLessons.length >= 3 && !currentAchievements.includes(achievement.name)) {
            newAchievements.push(achievement.name);
          }
          break;
        case 'Марафон знаний':
          if (progress.completedLessons.length === progress.totalLessons && !currentAchievements.includes(achievement.name)) {
            newAchievements.push(achievement.name);
          }
          break;
        case 'Сборщик XP':
          if (newXp >= 300 && !currentAchievements.includes(achievement.name)) {
            newAchievements.push(achievement.name);
          }
          break;
        // Добавь остальные ачивки по аналогии
        default:
          break;
      }
    }

    if (newAchievements.length > 0 || xp > 0) {
      const updatedAchievements = [...currentAchievements, ...newAchievements];
      const totalXp = currentXp + xp + newAchievements.reduce((sum, ach) => {
        const achievement = allAchievements.rows.find(a => a.name === ach);
        return sum + (achievement?.xp_reward || 0);
      }, 0);

      await pool.query(
        'UPDATE users SET achievements = $1, xp = $2 WHERE id = $3',
        [updatedAchievements, totalXp, userId]
      );

      res.json({
        message: 'Achievements checked',
        newAchievements,
        totalXp,
        achievements: updatedAchievements, // Возвращаем полный список
      });
    } else {
      res.json({ message: 'No new achievements', totalXp: currentXp + xp, achievements: currentAchievements });
    }
  } catch (error) {
    console.error('Error checking achievements:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserAchievements = async (req, res) => {
  const userId = req.query.userId;

  try {
    const result = await pool.query('SELECT achievements, xp FROM users WHERE id = $1', [userId]);
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      achievements: user.achievements || [],
      xp: user.xp || 0,
    });
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAchievements, checkAchievements, getUserAchievements };