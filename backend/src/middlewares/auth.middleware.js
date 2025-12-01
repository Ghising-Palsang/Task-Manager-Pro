const { AppConfig } = require("../config/config");
const AuthModel = require("../modules/auth/auth.model");
const jwt =require('jsonwebtoken');
const UserModel = require("../modules/user/user.model");
const userSvc = require("../modules/user/user.service");

const logInCheck = async(req, res, next) => {
    try {
        let token = req.headers["authorization"] || null;
        if (!token){
            throw{
                code:422,
                message: "Token Not found",
                name: "TOKEN_NOTFOUND"
            }
        };

        token = token.replace("Bearer", "").trim();

       let sessionData = await AuthModel.findOne({
            accessToken: token
        })

        if(!sessionData){
            throw{
                code: 422,
                message: "Session Data Invalid",
                name: "INVALID_SESSION_DATA"
            }
        }

        let payload = jwt.verify(token, AppConfig.jwtSecret);
        let userDetail = await UserModel.findById(payload.sub);
         
        req.loggedInUser = userSvc.publicLoggedInUser(userDetail);
        
        next()



    } catch (error) {
        next(error)
    }
}

module.exports = logInCheck;