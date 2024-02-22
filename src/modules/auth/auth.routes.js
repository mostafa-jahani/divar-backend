const { Router } = require('express');
const authController = require('./auth.controller');
const router = Router();
const AuthorizationGuard = require('../../common/guard/authorization.guard');

router.post('/send-otp', authController.sendOTP);
router.post('/check-otp', authController.checkOTP);
router.get('/logout', AuthorizationGuard, authController.logout);

module.exports = {
    AuthRouter: router
}