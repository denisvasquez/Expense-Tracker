const pool = require('../../database');

const addModule = async (req, res) => {
    const { name, description, type } = req.body;
    console.log(name, description, type);
}

const getModulesTransactions = async (req, res) => {}

const getTypesModules = async (req, res) => {
    try {
        const rows = await pool.query('SELECT * FROM type_modules');
        return res.status(200).json({ message: 'Types of modules retrieved successfully', body: rows });
    } catch (error) {
        console.error("An error occurred while retrieving types of modules");
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    addModule,
    getModulesTransactions,
    getTypesModules
}