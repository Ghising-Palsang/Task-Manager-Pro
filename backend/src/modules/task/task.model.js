const mongoose = require("mongoose");
const { TaskStatus } = require("../../config/constant.config");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: TaskStatus,
      default: TaskStatus.ACTIVE,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
  }
);

const TaskModel = mongoose.model("Task", TaskSchema);
module.exports = TaskModel;
