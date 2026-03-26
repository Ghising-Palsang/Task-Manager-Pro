import axiosConfig from "../config/axios.config";

class TaskSvc {
  addTask = async (
    input: string,
    description?: string,
    file?: File | undefined,
  ) => {
    const formData = new FormData();
    formData.append("title", input);
    formData.append("status", "active");

    if (description?.trim()) {
      formData.append("description", description.trim());
    }

    if (file) {
      formData.append("file", file);
    }

    return await axiosConfig.post("task/addTask", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  getTasks = async (pageNumber:number,limit:number) => {
    return await axiosConfig.get(`task/getTasks?Page=${pageNumber}&limit=${limit}`);
  };

  getStatusTasks = async (status: string) => {
    const res = await axiosConfig.get(`task/getTasks?status="${status}"`);
    return res.data.options.pagination.total;
  };

  deleteTask = async (id: string) => {
    return await axiosConfig.delete(`task/deleteTask/${id}`);
  };

  patchTask = async (
    id: string,
    data: { title: string; description: string; file?: File | undefined },
  ) => {
    const newFormData = new FormData();
    newFormData.append("title", data.title);
    newFormData.append("description", data.description);

    if (data.file) {
      newFormData.append("file", data.file);
    }
    return await axiosConfig.patch(`task/editTask/${id}`, newFormData);
  };

  patchStatus = async (id: string, data: object) => {
    return await axiosConfig.patch(`task/editTask/${id}`, data);
  };
}

const taskSvc = new TaskSvc();

export default taskSvc;
