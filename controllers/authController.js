const userService = require('../services/UserService');

class AuthController {

    async registration(req, res, next) {
        try {
            const candidate = await userService.findByEmail(req.body.email);

            if (candidate) {
                res.status(409).send(`${req.body.email} такий e-mail вже заєєстровано `)
            }

            const userData = await userService.registration({...req.body});
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});

            return res.json(userData);

        } catch (e) {
            console.log('Controller registration');
            console.log(e);
            res.sendStatus(404);
        }
    }

    async login(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async activateLink(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {

        }
    }

}

module.exports = new AuthController();