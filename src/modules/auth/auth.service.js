const createHttpError = require('http-errors');
const Service = require('../../common/service');
const UserModel = require('../user/user.model');
const { AuthMessage } = require('./auth.messages');
const { randomInt } = require('crypto');

class AuthService extends Service {
    #model;
    constructor() {
        super();
        this.#model = UserModel;
    }

    async sendOTP(mobile) {
        const user = await this.#model.findOne({ mobile });
        const now = new Date().getTime();
        const otp = {
            code: randomInt(10000, 99999),
            expiresIn: now + (1000 * 60)
        }

        if (!user) {
            const newUser = await this.#model.create({ mobile, otp });
            return newUser;
        }

        if (user.otp && user.otp.expiresIn > now) throw new createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired)
        user.otp = otp;
        await user.save();
        return user;
    }

    async checkOTP(mobile, code) {

    }


    async checkExistByMobile(mobile) {
        const user = await this.#model.findOne({ mobile });
        if (!user) throw new createHttpError.NotFound(AuthMessage.NotFound);
        return user;
    }

}


module.exports = new AuthService();