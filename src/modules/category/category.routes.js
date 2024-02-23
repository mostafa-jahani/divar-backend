const { Router } = require('express');
const router = Router();
const AuthorizationGuard = require('../../common/guard/authorization.guard');
const categoryController = require('./category.controller');

// router.post('/', AuthorizationGuard, categoryController.create);
router.post('/', categoryController.create);
router.get('/', categoryController.findAll);

module.exports = {
    CategoryRouter: router
}