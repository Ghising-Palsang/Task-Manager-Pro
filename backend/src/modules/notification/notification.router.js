const logInCheck = require("../../middlewares/auth.middleware");
const notificationCtrl = require("./notification.controller");

const notificationRouter = require("express").Router();

notificationRouter.post(
  "/storeNotification",
  logInCheck,
  notificationCtrl.storeNotification,
);

notificationRouter.get(
  "/getNotification",
  logInCheck,
  notificationCtrl.getNotification,
);

notificationRouter.patch(
  "/patchNotification",
  logInCheck,
  notificationCtrl.patchNotification,
);

module.exports = notificationRouter;
