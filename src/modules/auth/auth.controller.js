const Controller = require('../../common/controller');
const authService = require('./auth.service');
const { AuthMessage } = require('../auth/auth.messages');
const NodeEnv = require('../../common/constant/env.enum');

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
            return res.json({
                message: AuthMessage.SendOtpSuccessfully
            });
        } catch (error) {
            next(error);
        }
    }

    async checkOTP(req, res, next) {
        try {
            const { mobile, code } = req.body;
            const token = await this.#service.checkOTP(mobile, code);
            return res
                .cookie("access_token", token, {
                    httpOnly: true,
                    secure: process.env.NOD_ENV === NodeEnv.Production
                })
                .status(200)
                .json({
                    message: AuthMessage.LoginSuccesfully,
                    accessToken: token
                });
        } catch (error) {
            next(error);
        }
    }

}


module.exports = new AuthController();