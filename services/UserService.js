const bcrypt = require('bcrypt');
const uuid = require('uuid');

const User = require('../models/User');

const mailService = require('../services/MailService');
const tokenService = require('../services/TokenService');

class UserService {

    async registration(data) {
        const hashPassword = await bcrypt.hash(data.password, 3);
        const activationLink = uuid.v4();

        const user = await User.create({
            email: data.email,
            password: hashPassword,
            username: data.username,
            firstName: data.firstname,
            lastMame: data.lastname,
            activationLink: activationLink
        });

        await mailService.sendActivationMail(data.email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);
        const tokens = tokenService.generationTokens(user.dto);
        await tokenService.saveToken(user.dto.id, tokens.refreshToken);

        return {...tokens, user: user.dto};

    }

    async findByEmail(email) {
        return await User.findOne({where: {email: email}});
    }
}

module.exports = new UserService();