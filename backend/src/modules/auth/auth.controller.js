const pool = require('../../database');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = rows[0];
        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const userData = {
            id: user.id,
            username
        }

        const token = jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', body: { token, user: userData } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const register = async (req, res) => {
    const { username, email, role_id, typeAuth, password } = req.body;
    passwordHashed = await bycrypt.hash(password, 10);
    try {
        let rows = await pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
        if (rows.length > 0) {
            if (rows[0].username === username) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            if (rows[0].email === email) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }

        const userData = {
            username,
            email,
            role_id,
            type_auth: typeAuth,
            password: passwordHashed
        }

        await pool.query('INSERT INTO users SET ?', userData);

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const logout = async (req, res) => {}

const refreshToken = async (req, res) => {}

const verifyToken = async (req, res) => {}

const getUserInfo = async (req, res) => {}

const updateUser = async (req, res) => {}

const updatePassword = async (req, res) => {}

module.exports = {
    login,
    register,
    logout,
    refreshToken,
    verifyToken,
    getUserInfo,
    updateUser,
    updatePassword
}