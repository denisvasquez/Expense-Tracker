const router = require('express').Router();
const modulesController = require('./modules.controller');

router.post('/add', modulesController.addModule);
router.get('/types', modulesController.getTypesModules);
router.get('/:userId', modulesController.getModulesByUserId);
router.get('/transactions/:userId', modulesController.getModulesTransactionsByUserId);

module.exports = router;