const db = require('../db');

const getProfile = async(req, res) => {
    try {
        const userId = req.user.id; // Из middleware
        const result = await db.query('SELECT * FROM user_profiles WHERE user_id = $1', [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Профиль не найден' });
        }

        let profile = result.rows[0];
        let achievements = Array.isArray(profile.achievements) ?
            profile.achievements :
            typeof profile.achievements === 'string' ?
            JSON.parse(profile.achievements || '[]') : [];
        let points = profile.points || 0;

        console.log('Profile loaded - achievements:', achievements, 'points:', points);

        res.json(profile);
    } catch (error) {
        console.error('Ошибка при получении профиля:', error.stack);
        res.status(500).json({ error: 'Ошибка сервера', details: error.message });
    }
};

const updateProfile = async(req, res) => {
    try {
        const userId = req.user.id;
        const { name, birth_date, role, skills, avatar } = req.body;

        if (!name || name.trim() === '') {
            return res.status(400).json({ error: 'Имя не может быть пустым' });
        }

        const result = await db.query(
            'UPDATE user_profiles SET name = $1, birth_date = $2, role = $3, skills = $4, avatar = $5 WHERE user_id = $6 RETURNING *', [name, birth_date || null, role, skills, avatar, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Профиль не найден' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Ошибка при обновлении профиля:', error.stack);
        res.status(500).json({ error: 'Ошибка сервера', details: error.message });
    }
};

module.exports = { getProfile, updateProfile };