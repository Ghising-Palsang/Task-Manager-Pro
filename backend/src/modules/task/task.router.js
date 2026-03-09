const logInCheck = require("../../middlewares/auth.middleware");
const roleCheck = require("../../middlewares/role.middleware");
const bodyValidator = require("../../middlewares/validator.middleware");
const taskCtrl = require("./task.controller");
const taskDTO = require("./task.validator");

const taskRouter = require("express").Router();

taskRouter.post(
  "/addTask",
  bodyValidator(taskDTO),
  logInCheck,
  roleCheck("user", "admin"),
  taskCtrl.addTask
);
taskRouter.get(
  "/getTasks",
  logInCheck,
  roleCheck("user", "admin"),
  taskCtrl.getAllTasks
);
  
taskRouter.put(
  "/editTask/:id",
  logInCheck,
  roleCheck("user", "admin"),
  taskCtrl.editTask
);
taskRouter.delete(
  "/deleteTask/:id",
  logInCheck,
  roleCheck("user", "admin"),
  taskCtrl.deleteTask
);

taskRouter.get(
  "/getEveryTasks",
  logInCheck,
  roleCheck("admin"),
  taskCtrl.getEveryTask
);

module.exports = taskRouter;
