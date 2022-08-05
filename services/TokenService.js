const jwt = require('jsonwebtoken');

const UserToken = require('../models/UserToken');

class TokenService {

    generationTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {accessToken, refreshToken};
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await UserToken.findOne({where: {userId: userId}});

        if (tokenData) {
            tokenData.token = refreshToken;

            return tokenData.save();
        }

        return await UserToken.create({user_id: userId, token: refreshToken});

    }

}

module.exports = new TokenService();