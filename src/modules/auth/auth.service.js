const createHttpError = require('http-errors');
const Service = require('../../common/service');
const UserModel = require('../user/user.model');
const { AuthMessage } = require('./auth.messages');
const { randomInt } = require('crypto');
const jwt = require('jsonwebtoken');

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
        const user = await this.checkExistByMobile(mobile);
        const now = new Date().getTime();
        if (user?.otp?.expiresIn < now) throw new createUserError.Unauthorized(AuthMessage.OtpCodeExpired);
        if (user?.otp?.code !== code) throw new createUserError.Unauthorized(AuthMessage.OtpCodeIsIncorrect);
        if (!user.verifiedMobile) {
            user.verifiedMobile = true;
            await user.save();
        }
        const accessToken = await this.signToken({ mobile, id: user._id })
        return accessToken;
    }


    async checkExistByMobile(mobile) {
        const user = await this.#model.findOne({ mobile });
        if (!user) throw new createHttpError.NotFound(AuthMessage.NotFound);
        return user;
    }

    signToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1y" })
    }
}


module.exports = new AuthService();