const Controller = require('../../common/controller');
const authService = require('./auth.service');
const { AuthMessage } = require('../auth/auth.messages');
const NodeEnv = require('../../common/constant/env.enum');
const CookieNames = require('../../common/constant/cookie.enum');

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
                .cookie(CookieNames.AccessToken, token, {
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

    async logout(req, res, next) {
        try {
            return res.clearCookie(CookieNames.AccessToken).status(200).json({
                message: AuthMessage.LogoutSuccesfully
            });
        } catch (error) {
            next(error)
        }
    }

}


module.exports = new AuthController();