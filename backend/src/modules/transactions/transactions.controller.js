const pool = require('../../database');

const getModulesTransactionsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const rows = await pool.query(
            `SELECT name, description, mount, created_at
             FROM transaction
             WHERE user_id = ?`, [userId]
        );
        return res.status(200).json({ message: 'Transactions retrieved successfully', body: rows });
    } catch (error) {
        console.error("An error occurred while retrieving modules transactions for user:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const createTransaction = async (req, res) => {
    const { userId, moduleId, name, description, mount, type_transaction_id } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO transaction (user_id, module_id, name, description, mount, type_transaction_id)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [userId, moduleId, name, description, mount, type_transaction_id]
        );
        return res.status(201).json({ message: 'Transaction created successfully', body: result });
    } catch (error) {
        console.error("An error occurred while creating a transaction:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getTransactionTypes = async (req, res) => {
    try {
        const rows = await pool.query('SELECT * FROM type_transaction');
        return res.status(200).json({ message: 'Types of transactions retrieved successfully', body: rows });
    } catch (error) {
        console.error("An error occurred while retrieving types of transactions");
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getModulesTransactionsByUserId,
    getTransactionTypes,
    createTransaction
}