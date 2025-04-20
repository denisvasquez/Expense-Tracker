const router = require('express').Router();
const authController = require('./auth.controller');

router.post('/login', authController.login);
// pending
router.post('/register', authController.register);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refreshToken);
router.get('/verify', authController.verifyToken);
router.get('/me', authController.getUserInfo);
router.put('/update', authController.updateUser);
router.put('/update-password', authController.updatePassword);

module.exports = router;