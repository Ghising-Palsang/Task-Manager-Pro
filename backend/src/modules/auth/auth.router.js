const authCtrl = require('./auth.controller');

const authRouter = require('express').Router();

authRouter.use('/userRegister', authCtrl.userRegister)


module.exports = authRouter;