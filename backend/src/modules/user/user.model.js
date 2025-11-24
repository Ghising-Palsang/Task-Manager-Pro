const mongoose = require('mongoose');
const { UserRoles, Status } = require('../../config/constant.config');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: Object.values(UserRoles),
        default: UserRoles.CUSTOMER,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.INACTIVE,
        required: true
    },
    activationToken: String,
    expiryTime: Date,
    forgotPasswordToken: String
},{
    autoCreate: true,
    autoIndex: true,
    timestamps: true
});

const UserModel = mongoose.model("User", UserSchema );
module.exports = UserModel;