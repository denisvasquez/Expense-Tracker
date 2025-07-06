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

const getModulesTransactionsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const rows = await pool.query(
            `SELECT m.id, m.name, m.type_module, m.user_id, 
                    t.id AS transaction_id, t.name AS transaction_name, 
                    t.description, t.mount, t.created_at, tt.name AS type_transaction_name
             FROM module m
             LEFT JOIN transaction t ON m.id = t.module_id
             LEFT JOIN type_transaction tt ON t.type_transaction_id = tt.id
             WHERE m.user_id = ?`, [userId]
        );
        const modules = rows.reduce((acc, row) => {
            const { id, name, type_module, user_id, transaction_id, transaction_name, description, mount, type_transaction_name, created_at } = row;

            let module = acc.find(m => m.id === id);
            if (!module) {
                module = {
                    id,
                    name,
                    type_module,
                    user_id,
                    transactions: []
                };
                acc.push(module);
            }

            if (transaction_id) {
                module.transactions.push({
                    id: transaction_id,
                    name: transaction_name,
                    description,
                    mount,
                    type_transaction_name,
                    created_at
                });
            }

            return acc;
        }, []);
        return res.status(200).json({ message: 'Modules transactions retrieved successfully', body: modules });
    } catch (error) {
        console.error("An error occurred while retrieving modules transactions for user:", error);
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
    getModulesByUserId,
    getModulesTransactionsByUserId
}