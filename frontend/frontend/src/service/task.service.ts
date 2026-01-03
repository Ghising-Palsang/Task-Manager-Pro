import axiosConfig from "../config/axios.config"

class TaskSvc {
    addTask = async(input: string) => {
     return await axiosConfig.post("task/addTask", {
        title: input,
        status: "active"
     })
    }

    getTasks  = async() => {
        return await axiosConfig.get("task/getTasks")
    }

    deleteTask = async(id: string)=> {
      return  await axiosConfig.delete(`task/deleteTask/${id}`)
    }

    patchTask = async(id: string, data: object) => {
        return await axiosConfig.patch(`task/editTask/${id}`, data)
    }
}

const taskSvc = new TaskSvc()

export default taskSvc