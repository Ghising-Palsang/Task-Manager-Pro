const logInCheck = require('../../middlewares/auth.middleware');
const bodyValidator = require('../../middlewares/validator.middleware');
const userCtrl = require('../user/user.controller');
const authCtrl = require('./auth.controller');
const { RegisterUserDTO } = require('./auth.validator');

const authRouter = require('express').Router();

authRouter.use('/userRegister',bodyValidator(RegisterUserDTO), authCtrl.userRegister)
authRouter.use('/activateUser/:token', authCtrl.activateUser)
authRouter.use('/logInUser', authCtrl.logInUser)
authRouter.use('/getAllUsers', logInCheck, userCtrl.getAllUser)

module.exports = authRouter;