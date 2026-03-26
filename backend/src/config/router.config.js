const authRouter = require("../modules/auth/auth.router");
const notificationRouter = require("../modules/notification/notification.router");
const taskRouter = require("../modules/task/task.router");

const router = require("express").Router();

router.use("/auth", authRouter);
router.use("/task", taskRouter);
router.use("/notification", notificationRouter);
module.exports = router;
