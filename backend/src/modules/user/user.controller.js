const UserModel = require("./user.model");

class UserCtrl {
    async getAllUser (req, res, next) {
        try {
            let allUsers = await UserModel.find();
            res.json({
                data: allUsers,
                message: "All Users",
                status: 200,
                options:null
            })
        } catch (error) {
            next(error)
        }
    }
}

const userCtrl = new UserCtrl();
module.exports = userCtrl;