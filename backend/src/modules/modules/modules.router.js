const router = require('express').Router();
const modulesController = require('./modules.controller');

router.post('/add', modulesController.addModule);
router.get('/transactions', modulesController.getModulesTransactions);

module.exports = router;