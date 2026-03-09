const logInCheck = require('../../middlewares/auth.middleware');
const bodyValidator = require('../../middlewares/validator.middleware');
const userCtrl = require('../user/user.controller');
const authCtrl = require('./auth.controller');
const { RegisterUserDTO } = require('./auth.validator');

const authRouter = require('express').Router();

authRouter.post('/userRegister',bodyValidator(RegisterUserDTO), authCtrl.userRegister)
authRouter.get('/activateUser/:token', authCtrl.activateUser)
authRouter.post('/logInUser', authCtrl.logInUser)
authRouter.get('/getAllUsers', logInCheck, userCtrl.getAllUser)
authRouter.post('/refreshToken', authCtrl.refreshAccessToken)
authRouter.post('/logOutUser', authCtrl.logout)
authRouter.get('/me', logInCheck, authCtrl.getLoggedInUser)

module.exports = authRouter;