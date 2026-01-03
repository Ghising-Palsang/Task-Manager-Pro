const logInCheck = require("../../middlewares/auth.middleware");
const roleCheck = require("../../middlewares/role.middleware");
const bodyValidator = require("../../middlewares/validator.middleware");
const taskCtrl = require("./task.controller");
const taskDTO = require("./task.validator");

const taskRouter = require("express").Router();

taskRouter.use(
  "/addTask",
  bodyValidator(taskDTO),
  logInCheck,
  roleCheck("user", "admin"),
  taskCtrl.addTask
);
taskRouter.use(
  "/getTasks",
  logInCheck,
  roleCheck("user", "admin"),
  taskCtrl.getAllTasks
);
taskRouter.use(
  "/editTask/:id",
  logInCheck,
  roleCheck("user", "admin"),
  taskCtrl.editTask
);
taskRouter.use(
  "/deleteTask/:id",
  logInCheck,
  roleCheck("user", "admin"),
  taskCtrl.deleteTask
);

taskRouter.use(
  "/getEveryTasks",
  logInCheck,
  roleCheck("admin"),
  taskCtrl.getEveryTask
);

module.exports = taskRouter;
