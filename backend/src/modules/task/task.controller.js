const { TaskStatus } = require("../../config/constant.config");
const { getIO } = require("../../config/socket");
const fileUploadSvc = require("../../services/fileUpload.service");
const NotificationModel = require("../notification/notification.model");

const TaskModel = require("./task.model");

class TaskCtrl {
  addTask = async (req, res, next) => {
    try {
      const data = { ...req.body };

      if (!data) {
        throw {
          code: 404,
          message: "Data not found",
          name: "DATA_NOT_FOUND",
        };
      }

      if (!data.title) {
        throw {
          code: 404,
          message: "Title not found",
          name: "TITLE_NOTFOUND",
        };
      }

      if (req.file) {
        data.file = await fileUploadSvc.svc.fileUpload(req.file.path, "task/");
      }

      const userData = req.loggedInUser;
      if (!userData) {
        throw {
          code: 401,
          name: "USER_NOT_LOGGED",
          message: "User Data not found",
        };
      }

      data.user = userData._id;

      let taskObj = new TaskModel(data);
      let response = await taskObj.save();

      let task = taskObj.toObject();
      const loggedInUser = req.loggedInUser._id;

      let notification = {
        user:loggedInUser,
       task:  task._id,
       message: task.title
      }

      let notificationObj = new NotificationModel(notification);
      await notificationObj.save()

      let notificationData = notificationObj.toObject();
      try {
        const io = getIO();
        io.emit("notification-added", notificationData)

        
      } catch (error) {
        throw {
          code: 500,
          message: "Error from socket notification",
          name: "NOTIFICATION_SOCKET_ERR"
        }
      }

      res.json({
        data: response,
        message: `${userData.name} task is saved in Db`,
        status: "ok",
        options: null,
      });
    } catch (error) {
      next(error);
    }
  };

  getTask = async (req, res, next) => {
    let userId = req.loggedInUser._id;
    let taskId = req.params.id;
    let page = req.query.page || 1;
    let limit = req.query.limit || 5;
    let skip = (page - 1) * limit;
    let filter = {
      user: userId,
      _id: taskId,
    };

    if (req.query.search) {
      filter = {
        ...filter,
        title: new RegExp(req.query.search, "i"),
      };
    }

    if (req.query.status === TaskStatus.ACTIVE) {
      filter.status = TaskStatus.ACTIVE;
    }

    if (req.query.status === TaskStatus.COMPLETED) {
      filter.status = TaskStatus.COMPLETED;
    }

    let response = await TaskModel.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: "desc" });

    let totalTask = await TaskModel.countDocuments(filter);

    res.json({
      data: response,
      message: "Tasks",
      status: "ok",
      options: {
        pagination: {
          current: page,
          total: totalTask,
          pageSize: limit,
        },
      },
    });
  };

  getTasks = async (req, res, next) => {
    let userId = req.loggedInUser._id;

    let page = req.query.page || 1;
    let limit = req.query.limit || 5;
    let skip = (page - 1) * limit;
    let filter = {
      user: userId,
    };

    if (req.query.search) {
      filter = {
        ...filter,
        title: new RegExp(req.query.search, "i"),
      };
    }

    if (req.query.status === TaskStatus.ACTIVE) {
      filter.status = TaskStatus.ACTIVE;
    }

    if (req.query.status === TaskStatus.COMPLETED) {
      filter.status = TaskStatus.COMPLETED;
    }

    let response = await TaskModel.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: "desc" });

    let totalTask = await TaskModel.countDocuments(filter);

    res.json({
      data: response,
      message: "Tasks",
      status: "ok",
      options: {
        pagination: {
          current: page,
          total: totalTask,
          pageSize: limit,
        },
      },
    });
  };

  editTask = async (req, res, next) => {
    try {
      const { title, description, status } = req.body;
      // task id = unique id after saving the task
      const taskId = req.params.id;
      // userId after login check middleware
      const userId = req.loggedInUser._id;

      // check taskId if it belongs to the user or not and check the user with logginUser._id
      let updatedData = {};
      if (title !== undefined) updatedData.title = title;
      if (description !== undefined) updatedData.description = description;
      if (status !== undefined) updatedData.status = status;

      const task = await TaskModel.findById(taskId);

      console.log(req.file, "req.file");
      if (req.file) {
        const uploaded = await fileUploadSvc.svc.replaceFile(
          task.file?.publicId,
          req.file.path,
          "task/",
        );

        updatedData.file = {
          publicId: uploaded.publicId,
          publicUrl: uploaded.publicUrl,
          thumbUrl: uploaded.thumbUrl,
        };
      }

      let response = await TaskModel.findOneAndUpdate(
        {
          _id: taskId,
          user: userId,
        },
        { $set: updatedData },
        { new: true },
      );

      if (!response) {
        throw {
          code: 422,
          message: "Task not updated",
          name: "TASK_NOTUPDATED",
        };
      }

      res.json({
        data: response,
        message: "Task Updated",
        status: "ok",
        options: null,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteTask = async (req, res, next) => {
    try {
      let taskId = req.params.id;
      if (!taskId) {
        throw {
          code: 422,
          message: "Task Id not found ",
          name: "TASKID_NOTFOUND_DEL",
        };
      }
      let userId = req.loggedInUser._id;

      let response = await TaskModel.findOneAndDelete({
        _id: taskId,
        user: userId,
      });

      res.json({
        data: response,
        message: "Task Deleted",
        status: "ok",
        options: null,
      });
    } catch (error) {
      next(error);
    }
  };

  getEveryTask = async (req, res, next) => {
    try {
      await TaskModel.find();
      res.json({
        message: "All Tasks",
        status: "ok",
      });
    } catch (error) {
      next(error);
    }
  };
}

const taskCtrl = new TaskCtrl();
module.exports = taskCtrl;
