const express = require('express');
const passportConfig = require('../config/passport');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.put('/account/profile', passportConfig.isAuthenticated, userController.updateUser);
router.put('/account/password', passportConfig.isAuthenticated, userController.changePassword);
router.get('/users', userController.getAllUsers);
router.get('/user', userController.getUserById);
router.delete('/account/delete', userController.deleteUser);
router.put('/admin', userController.createAdmin);

module.exports = router;