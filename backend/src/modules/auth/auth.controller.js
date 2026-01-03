const { AppConfig } = require("../../config/config");
const { Status } = require("../../config/constant.config");
const UserModel = require("../user/user.model");
const userSvc = require("../user/user.service");
const authMailSvc = require("./auth.mail");
const jwt = require("jsonwebtoken");
const authSvc = require("./auth.service");
const AuthModel = require("./auth.model");
const bcrypt = require('bcrypt')


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
      if (!user) {
        throw {
          code: 401,
          message: "Incorrect Email",
          status: "Incorrect Email",
   
     };
      }

      let correctPass = bcrypt.compareSync(password, user.password);
      if (!correctPass) {
        throw {
          code: 401,
          message: "Incorrect Password",
          status: "Incorrect Password",
        };
      }

      if (user.status !== "active") {
        throw {
          code: 401,
          message: "Account not Verified",
          status: "ACCOUNT_NOTVERIFIED",
        };
      }

      let accessToken = jwt.sign(
        { sub: user._id, typ: "Bearer" },
        AppConfig.jwtSecret,
        { expiresIn: "15m" }
      );
      let refreshToken = jwt.sign(
        { sub: user._id, typ: "Bearer" },
        AppConfig.jwtSecret,
        { expiresIn: "7d" }
      );

      let sessionData = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };

      let response = await authSvc.storeSessionData(sessionData);
      console.log(response);
      

 res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, 
        sameSite: "Lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000
      })

      
      

      res.json({
        data: {
          accessToken: accessToken,
        },
        message: "User Logged In",
        status: 200,
        options: null,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {

      const refreshToken = req.cookies.refreshToken;
      console.log(refreshToken, "refresh token")
      if(!refreshToken){
        throw{
          code: 401,
          message: "RefreshToken not found"
        }
      }
      await AuthModel.findOneAndDelete({
        refreshToken: refreshToken
      });

      res.json({
        message: "User logged out",
        status: "ok",
        options: null,
      });
    } catch (error) {
      next(error);
    }
  }

  refreshAccessToken = async (req, res, next) => {
    try {
      const token = req.cookies.refreshToken;
      if(!token){
        throw{
          code: 401,
          name: "TOKEN_NOT_FOUND_REF",
          message:"Token not found refresh"
        }
      }
      const payload = jwt.verify(token, AppConfig.jwtSecret);
      
      const user = await UserModel.findById(payload.sub)



      let tokenResponse = await AuthModel.findOne({
        refreshToken: token
      })
      if (!tokenResponse) {
        throw {
          code: 401,
          message: "INVALID Refresh token",
          name: "INVALID_REFRESH_TOKEN",
        };
      }

      const newAcessToken = jwt.sign(
        { sub: user._id, typ: "Bearer" },
        AppConfig.jwtSecret,
        { expiresIn: "15m" }
      );

      await AuthModel.findOneAndUpdate({
        refreshToken: token
      }, {
        $set: {
          accessToken: newAcessToken
        }
      })

      res.json({
        data: {
          newAcessToken: newAcessToken
        },
        message: "New Access Token Created",
        status: "ok",
        options:null
      })
    } catch (error) {
      next(error);
    }
  };


  getLoggedInUser = async(req, res, next) => {
    try {
      let token = req.headers["authorization"] || null
      if(!token) {
        throw {
          code: 403,
          name: "NO TOKEN FOUND",
          message:"Token not found for loggedInuser"
        }
      }

    token = token.replace("Bearer", "").trim()
    const payload = jwt.verify(token, AppConfig.jwtSecret);

    const user = await UserModel.findOneAndDelete({
      _id: payload.sub
    })

   const publicUser =  userSvc.publicLoggedInUser(user)

      res.json({
        data: publicUser,
        message: "Logged IN user Profile",
        status: "ok"
      })

    } catch (error) {
      next(error)
    }
  }
}

const authCtrl = new AuthCtrl();
module.exports = authCtrl;
