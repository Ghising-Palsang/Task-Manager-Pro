const { getIO } = require("../../config/socket");
const NotificationModel = require("./notification.model");

class NotificationCtrl {
  storeNotification = async (req, res, next) => {
    try {
      const { taskId, message, read } = req.body;
      const loggedInUser = req.loggedInUser._id;
      console.log(loggedInUser, "loggedInUser");

      const notificationData = {
        user: loggedInUser,
        task: taskId,
        message: message,
      };

      if (read) {
        notificationData.read = false;
      }
      const notificationObj = new NotificationModel(notificationData);
      const response = await notificationObj.save();

      res.json({
        data: response,
        message: "Notification stored",
        status: "ok",
        options: null,
      });
    } catch (error) {
      console.log("error while storing notification", error);
    }
  };

  getNotification = async (req, res, next) => {
    try {
      let userId = req.loggedInUser._id;
      if (!userId) {
        throw {
          code: 401,
          message: "UserId not found in Notification get",
          name: "USERID_NOTFOUND",
        };
      }
      console.log(userId, "userId");

      const notification = await NotificationModel.find({
        user: userId,
      }).sort({ createdAt: "desc" });

      res.json({
        data: notification,
        message: "Notification Got",
        status: "ok",
        options: null,
      });
    } catch (error) {
      console.log("error while getting notification", error);
    }
  };

  patchNotification = async (req, res, next) => {
    try {
      // loggedInUser
      const loggedInUser = req.loggedInUser._id;

      let updatedNotification = await NotificationModel.findOneAndUpdate(
        {
          user: loggedInUser,
        },
        {
          read: true,
        },
      );

      res.json({
        data: updatedNotification,
        message: "Notification Patched",
        status: "ok",
        options:null
      })
    } catch (error) {
      console.error("Error while patching notification", error);
    }
  };
}

const notificationCtrl = new NotificationCtrl();
module.exports = notificationCtrl;
