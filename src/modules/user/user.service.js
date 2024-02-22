const createHttpError = require('http-errors');
const Service = require('../../common/service');
const UserModel = require('../user/user.model');

class UserService extends Service {
    #model;
    constructor() {
        super();
        this.#model = UserModel;
    }

}


module.exports = new UserService();