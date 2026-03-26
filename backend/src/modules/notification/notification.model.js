const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    task: {
      type: mongoose.Schema.ObjectId,
      ref: "Task",
      required: true,
    },
    message: String,
    read:{
      type:Boolean,
      default: false
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
  },
);

const NotificationModel = mongoose.model("Notification", NotificationSchema);
module.exports = NotificationModel;
