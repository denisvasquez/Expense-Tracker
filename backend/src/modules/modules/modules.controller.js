const pool = require('../../database');

const addModule = async (req, res) => {
    const { name, type_module, user_id } = req.body;
    try {
        if (!name || !type_module || !user_id) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const result = await pool.query(
            'INSERT INTO module (name, type_module, user_id) VALUES (?, ?, ?) ',
            [name, type_module, user_id]
        );

        return res.status(201).json({
            message: 'Module added successfully',
        });
    } catch (error) {
        console.error("An error occurred while adding the module:", error);
        if (error.code === 'ER_DUP_ENTRY') { // Unique violation error code
            return res.status(409).json({ message: 'Module already exists' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getModulesByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const rows = await pool.query('SELECT * FROM module WHERE user_id = ?', [userId]);
        return res.status(200).json({ message: 'Modules retrieved successfully', body: rows });
    } catch (error) {
        console.error("An error occurred while retrieving modules for user:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getTypesModules = async (req, res) => {
    try {
        const rows = await pool.query('SELECT * FROM type_module');
        return res.status(200).json({ message: 'Types of modules retrieved successfully', body: rows });
    } catch (error) {
        console.error("An error occurred while retrieving types of modules");
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    addModule,
    getTypesModules,
    getModulesByUserId
}