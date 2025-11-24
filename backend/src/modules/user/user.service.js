const bcrypt = require('bcrypt');
const { generateRandomString } = require('../../utilities/helper');
const { Status } = require('../../config/constant.config');
const UserModel = require('./user.model');

class UserSvc {
    async transformUserData (req) {
        const data = req.body;
        
        if(!data) {
            throw {
                code : 422,
                message: "Data not set",
                name: "DATA_NOTSET"
            }
        }

        let salt = await bcrypt.genSalt(12);
        data.password = bcrypt.hashSync(data.password, salt);

        data.activationToken = generateRandomString();
        data.expiryTime = new Date(Date.now() + 3* 3600 * 1000);
        data.status = Status.PENDING;

        return data;
    }

    async createUser (userData) {
        try {
            const userObj = new UserModel(userData);
            return await userObj.save();

        } catch (error) {
            throw error;
        }
    }
          

     
}

const userSvc = new UserSvc();
module.exports = userSvc;