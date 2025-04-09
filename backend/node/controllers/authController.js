const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_jwt_key';

const registerUser = async(req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.query(
            'INSERT INTO users (username, email, phone, password_hash) VALUES ($1, $2, $3, $4) RETURNING *', [username, email, phone, hashedPassword]
        );

        res.status(201).json({ message: 'Пользователь зарегистрирован', user: result.rows[0] });
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        res.status(500).json({ error: 'Ошибка при регистрации' });
    }
};

const loginUser = async(req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!password || (!username && !email)) {
            return res.status(400).json({ error: 'Введите логин или email и пароль' });
        }

        const field = email ? 'email' : 'username';
        const value = email || username;

        const result = await db.query(`SELECT * FROM users WHERE ${field} = $1`, [value]);

        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Неверный логин/email или пароль' });
        }

        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Неверный логин/email или пароль' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.json({
            message: 'Успешный вход',
            token,
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error('Ошибка при входе:', error);
        res.status(500).json({ error: 'Ошибка при входе' });
    }
};

module.exports = { registerUser, loginUser };