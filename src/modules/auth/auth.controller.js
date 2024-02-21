const Controller = require('../../common/controller');
const authService = require('./auth.service');
const AuthMessage = require('../auth/auth.messages');

class AuthController extends Controller {

    #service;
    constructor() {
        super();
        this.#service = authService;
    }

    async sendOTP(req, res, next) {
        try {
            const { mobile } = req.body;
            await this.#service.sendOTP(mobile);
            return {
                message: AuthMessage.SendOtpSuccessfully
            }
        } catch (error) {
            next(error);
        }
    }

    async checkOTP(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

}


module.exports = new AuthController();