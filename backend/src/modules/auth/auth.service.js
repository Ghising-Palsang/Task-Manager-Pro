const AuthModel = require("./auth.model");

class AuthSvc {
    async storeSessionData (sessionData) {
        try {
            let sessionObj = new AuthModel(sessionData);
            return await sessionObj.save();
        } catch (error) {
            throw error;
        }
    }


}

const authSvc = new AuthSvc();
module.exports = authSvc;