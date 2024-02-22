const { Router } = require('express');
const userController = require('./user.controller');
const router = Router();
const AuthorizationGuard = require('../../common/guard/authorization.guard')

router.get('/test', AuthorizationGuard , userController.test);

module.exports = {
    UserRouter: router
}