const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_jwt_key';

const registerUser = async(req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Вставка пользователя в таблицу users
        const userResult = await db.query(
            'INSERT INTO users (username, email, phone, password_hash) VALUES ($1, $2, $3, $4) RETURNING *', [username, email, phone, hashedPassword]
        );
        const user = userResult.rows[0];

        // Начальная конфигурация аватара
        const initialAvatar = {
            topType: 'ShortHairShortFlat',
            hairColor: 'Brown',
            skinColor: 'Light',
            eyeType: 'Default',
            clotheType: 'ShirtCrewNeck',
            clotheColor: '#FFFFFF',
            mouthType: 'Smile',
            accessoriesType: 'Blank',
            facialHairType: 'Blank',
            avatarBackground: '#FFFFFF',
        };

        // Начальные данные для active_courses и achievements
        const initialActiveCourses = []; // Пустой массив
        const initialAchievements = []; // Пустой массив

        // Вставка профиля в таблицу user_profiles
        await db.query(
            'INSERT INTO user_profiles (user_id, name, role, skills, active_courses, points, achievements, avatar) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [user.id, username, 'Ученик', [], initialActiveCourses, 0, initialAchievements, initialAvatar]
        );

        res.status(201).json({ message: 'Пользователь зарегистрирован', user: userResult.rows[0] });
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        res.status(500).json({ error: 'Ошибка при регистрации' });
    }
};

// Оставшаяся часть authController.js без изменений
const loginUser = async(req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!password || (!username && !email)) {
            return res.status(400).json({ error: 'Введите логин или email и пароль' });
        }

        const field = email ? 'email' : 'username';
        const value = email || username;

        const userResult = await db.query(`SELECT * FROM users WHERE ${field} = $1`, [value]);

        if (userResult.rows.length === 0) {
            return res.status(400).json({ error: 'Неверный логин/email или пароль' });
        }

        const user = userResult.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Неверный логин/email или пароль' });
        }

        const profileResult = await db.query('SELECT * FROM user_profiles WHERE user_id = $1', [user.id]);
        const profile = profileResult.rows[0] || {};

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.json({
            message: 'Успешный вход',
            token,
            user: { id: user.id, username: user.username, email: user.email },
            profile: profile,
        });
    } catch (error) {
        console.error('Ошибка при входе:', error);
        res.status(500).json({ error: 'Ошибка при входе' });
    }
};

module.exports = { registerUser, loginUser };