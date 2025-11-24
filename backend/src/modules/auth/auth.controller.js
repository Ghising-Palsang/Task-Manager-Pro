const userSvc = require("../user/user.service");
const authMailSvc = require("./auth.mail");

class AuthCtrl {
    async userRegister (req, res, next) {
        const userData = await userSvc.transformUserData(req);
        const user = await userSvc.createUser(userData);
        await authMailSvc.notifyAccountActivation(user)
        res.json({
            data: user,
            message: "User has been registerd",
            status: "OK",
            options: null
        })
        


    }
}

const authCtrl = new AuthCtrl();
module.exports = authCtrl;
