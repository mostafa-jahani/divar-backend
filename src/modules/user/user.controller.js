const Controller = require('../../common/controller');
const userService = require('./user.service');

class UserController extends Controller {

    #service;
    constructor() {
        super();
        this.#service = userService;
    }

    async test(req, res, next) {
        try {
            const user = req.user;
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }


}


module.exports = new UserController();