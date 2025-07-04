const router = require('express').Router();
const modulesController = require('./transactions.controller');

router.get('/types', modulesController.getTransactionTypes);
router.get('/:userId', modulesController.getModulesTransactionsByUserId);
router.post('/', modulesController.createTransaction);

module.exports = router;