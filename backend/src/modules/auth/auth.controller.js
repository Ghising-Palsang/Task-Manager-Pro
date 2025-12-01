const { AppConfig } = require("../../config/config");
const { Status } = require("../../config/constant.config");
const UserModel = require("../user/user.model");
const userSvc = require("../user/user.service");
const authMailSvc = require("./auth.mail");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authSvc = require("./auth.service");
const AuthModel = require("./auth.model");

class AuthCtrl {
  async userRegister(req, res, next) {
    const userData = await userSvc.transformUserData(req);
    const user = await userSvc.createUser(userData);
    await authMailSvc.notifyAccountActivation(user);
    res.json({
      data: user,
      message: "User has been registerd",
      status: "OK",
      options: null,
    });
  }

  async activateUser(req, res, next) {
    try {
      const token = req.params.token;
      console.log(token);

      let user = await userSvc.findSingleUser({ activationToken: token });

      user = await UserModel.findOneAndUpdate(
        {
          _id: user._id,
        },
        { $set: { activationToken: null, status: Status.ACTIVE } },
        { new: true }
      );

      res.json({
        data: user,
        message: "User Activated",
        status: "200",
        options: null,
      });
    } catch (error) {
      next(error);
    }
  }

  async logInUser(req, res, next) {
    try {
      /* 
        email verify
        password verify bcrypt

        status active or not

        jwt token - access Token refresh Token

        sessionId
       
       */
      let { email, password } = req.body;

      let user = await userSvc.findSingleUser({ email: email });
      if(!user) {
        throw {
            code: 401,
            message: "Incorrect Credentials",
            status: "CREDENTIALS_NOTFOUND"
        }
      }

      let correctPass  = bcrypt.compareSync(password, user.password);
      if(!correctPass){
        throw{
            code : 401,
            message: "Incorrect Password",
            status: "Incorrect Password"
        }
      }

      if(user.status !== 'active'){
        throw{
            code: 401,
            message: "Account not Verified",
            status: "ACCOUNT_NOTVERIFIED"
        }
      }

     let accessToken = jwt.sign({sub: user._id, typ:'Bearer'}, AppConfig.jwtSecret, {expiresIn:'15m'});
     let refreshToken = jwt.sign({sub: user._id, typ:"Bearer"}, AppConfig.jwtSecret, {expiresIn:"7d"})


     let sessionData = {
        accessToken: accessToken,
        refreshToken: refreshToken
     }

    let response = await authSvc.storeSessionData(sessionData);
    console.log(response);

    res.json({
        data: {
            accessToken: accessToken,
            refreshToken: refreshToken
        },
        message: "User Logged In",
        status: 200,
        options: null
    })
    } catch (error) {
      next(error);
    }
  }

  async logout (req, res, next) {
    try {
      
      AuthModel.findOneAndDelete({
        accessToken: accessToken
      })
    } catch (error) {
      next(error)
    }
  }
}

const authCtrl = new AuthCtrl();
module.exports = authCtrl;
