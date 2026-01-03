
const { TaskStatus } = require("../../config/constant.config");
const UserModel = require("../user/user.model");
const TaskModel = require("./task.model");

class TaskCtrl {
     addTask = async(req, res ,next) => {
        try {
            const data = req.body;
            const userData = req.loggedInUser;
            if(!userData){
                throw{
                    code:401,
                    name: "USER_NOT_LOGGED",
                    message: "User Data not found"
                }
            }
          
           data.user = userData._id
          let taskObj = new TaskModel(data);
          let response =  await taskObj.save()

          res.json({
            data: response,
            message: `${userData.name} task is saved in Db`,
            status: "ok",
            options: null
          })

        } catch (error) {
            next(error)
        }
    }

    getAllTasks = async(req, res,next) => {
         let userId = req.loggedInUser._id;
        let page = req.query.page || 1;
        let limit = req.query.limit || 5;
        let skip = (page - 1) * limit;
        let filter  = {
                user: userId
            }
      

            if(req.query.search){
                filter = {
                    ...filter,
                    title: new RegExp(req.query.search, "i")
                }
            }

            if(req.query.status === TaskStatus.ACTIVE) {
                filter.status = TaskStatus.ACTIVE
            }

            if(req.query.status === TaskStatus.COMPLETED) {
                filter.status = TaskStatus.COMPLETED
            }

            let response = await TaskModel.find(filter).skip(skip).limit(limit).sort({createdAt: "desc"})
            
            let totalTask = await TaskModel.countDocuments(filter)


            res.json({
                data: response,
                message: "All Tasks",
                status: "ok",
                options: {
                    pagination: {
                        current: page,
                        total: totalTask,
                        pageSize: limit
                    }
                }
            })
       
    }



    editTask = async(req, res,next)=> {
        try {
            const {title, description, status} = req.body;
            // task id = unique id after saving the task
            const taskId = req.params.id;
            // userId after login check middleware
            const userId = req.loggedInUser._id;

            // check taskId if it belongs to the user or not and check the user with logginUser._id
           let updateData = {};
           if(title !== undefined) updateData.title = title;
           if(description !== undefined) updateData.description = description;
           if(status !== undefined) updateData.status = status;


          let response =   await TaskModel.findOneAndUpdate(
                {
                    _id: taskId,
                    user: userId
                },
                {$set: updateData},
                {new: true}
            )

            if(!response) {
                throw{
                    code:422,
                    message: "Task not updated",
                    name: "TASK_NOTUPDATED"
                }
            }

            res.json({
                data: response,
                message: "Task Updated",
                status: "ok",
                options: null
            })


        } catch (error) {
            next(error)
        }
    }

    deleteTask = async(req, res, next) => {
        try {
            let taskId = req.params.id;
            if(!taskId) {
                throw{
                    code:422,
                    message: "Task Id not found ",
                    name:"TASKID_NOTFOUND_DEL"
                }
            }
            let userId = req.loggedInUser._id;

           let response =  await TaskModel.findOneAndDelete({
                _id: taskId,
                user:userId
            })

            res.json({
                data: response,
                message: "Task Deleted",
                status: "ok",
                options: null
            })
        } catch (error) {
            next(error)
        }
    }

    getEveryTask = async(req,res,next) => {
        try {
            await TaskModel.find();
            res.json({
                message: "All Tasks",
                status: "ok"
            })
            
        } catch (error) {
            next(error)
        }
    }
    
}

const taskCtrl = new TaskCtrl();
module.exports = taskCtrl;