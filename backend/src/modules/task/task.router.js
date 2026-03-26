const logInCheck = require("../../middlewares/auth.middleware");
const uploader = require("../../middlewares/file-parser.middleware");
const roleCheck = require("../../middlewares/role.middleware");
const bodyValidator = require("../../middlewares/validator.middleware");
const taskCtrl = require("./task.controller");
const taskDTO = require("./task.validator");

const taskRouter = require("express").Router();

taskRouter.post(
  "/addTask",
  uploader("mixed").single("file"),
  bodyValidator(taskDTO),
  logInCheck,
  roleCheck("user", "admin"),
  taskCtrl.addTask,
);
taskRouter.get(
  "/getTask/:id",
  logInCheck,
  roleCheck("user", "admin"),
  taskCtrl.getTask,
);

taskRouter.get(
  "/getTasks",
  logInCheck,
  roleCheck("user", "admin"),
  taskCtrl.getTasks,
);


taskRouter.patch(
  "/editTask/:id",
  uploader("mixed").single("file"),
  logInCheck,
  roleCheck("user", "admin"),
  taskCtrl.editTask,
);


taskRouter.delete(
  "/deleteTask/:id",
  logInCheck,
  roleCheck("user", "admin"),
  taskCtrl.deleteTask,
);

taskRouter.get(
  "/getEveryTasks",
  logInCheck,
  roleCheck("admin"),
  taskCtrl.getEveryTask,
);

module.exports = taskRouter;
