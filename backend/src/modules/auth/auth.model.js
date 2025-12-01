const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    accessToken: String,
    refreshToken: String
}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true  
})

const AuthModel =  mongoose.model("Auth", AuthSchema);
module.exports = AuthModel;