import { useEffect, useMemo, useState } from "react";
import AddBar from "./AddBar";
import MeasureBox from "./MeasureBox";
import Taskbar from "./Taskbar";
import { IoExitOutline } from "react-icons/io5";

import { useNavigate } from "react-router";
import taskSvc from "../service/task.service";
import { useToken } from "../context/token.contex";
import { socket } from "../config/socket.config";
import { FaRegBell } from "react-icons/fa";
import notificationSvc from "../service/notification.service";
import dayjs from "dayjs";

export interface ITasks {
  _id: string;
  title: string;
  file: {
    publicId: string | undefined;
    publicUrl: string | undefined;
    thumbUrl: string | undefined;
  };
  description: string;
  status: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface INotificationProps {
  _id: string;
  user: string;
  task: string;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

const Base = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [editInput, setEditInput] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<string>("");
  const [editFile, setEditFile] = useState<File | undefined>();

  const [filter, setFilter] = useState<string>("all");
  const [notification, setNotification] = useState<INotificationProps[]>([]);
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);

  const { logout, tokenReady } = useToken();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const descriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    // console.log(e.target.value);
  };

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const editInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInput(e.target.value);
  };

  const editDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditDescription(e.target.value);
  };

  const editFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEditFile(e.target.files[0]);
    }
  };

  const getTasks = async () => {
    const response = await taskSvc.getTasks(page, limit);
    console.log(response);
    return response;
  };

  const filteredTasks = useMemo(() => {
    if (filter === "active") {
      return tasks.filter((t) => t.status === "active");
    } else if (filter === "completed") {
      return tasks.filter((t) => t.status === "completed");
    }
    return tasks;
  }, [tasks, filter]);

  // add Task

  const addTask = async () => {
    if (input.trim() === "") return;

    try {
      const response = await taskSvc.addTask(input, description, file);
      console.log(response, "addtask");
      const newTask = response.data.data;
      console.log(newTask, "newTask hellllo");
      setTasks((prev) => [
        {
          ...newTask,
          description: newTask.description || "",
          file: newTask.file || null,
        },
        ...prev,
      ]);
      setInput("");
      setDescription("");
      setFile(undefined);
    } catch (error) {
      console.error(`Error adding tasks ${error}`);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await taskSvc.deleteTask(taskId);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);

      setTasks(updatedTasks);

      if (updatedTasks.length === 0) {
        // Fetch tasks starting from current page again
        const res = await taskSvc.getTasks(page, limit);
        console.log(res, "res")
        const nextTasks = res.data.data;

        if (nextTasks.length > 0) {
          setTasks(nextTasks);
        
        } else if (page > 1) {
          
          setPage((prev) => prev - 1);
          const resPrev = await taskSvc.getTasks(page - 1, limit);
          setTasks(resPrev.data.tasks);
        }
      }
    } catch (error) {
      console.error(`Err Deleting task ${error}`);
    }
  };

  const handleCompletedTasks = async (id: string) => {
    const taskToUpdate = tasks.find((t) => t._id === id);
    if (!taskToUpdate) return;
    const newStatus =
      taskToUpdate.status === "completed" ? "active" : "completed";
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, status: newStatus } : task,
      ),
    );
    try {
      await taskSvc.patchStatus(id, {
        status: newStatus,
      });
    } catch (error) {
      console.error(`Failed to patch the status completed, ${error}`);
    }
  };

  const onEditClick = (task: ITasks) => {
    setEditingTaskId(task._id);
    // console.log(task._id);
    setEditInput(task.title ?? "");
    setEditDescription(task.description ?? "");
  };

  const onEditCancel = () => {
    setEditingTaskId("");
    setEditInput("");
    setEditDescription("");
  };

  const onEditSubmit = async (taskId: string) => {
    if (!editInput.trim()) return;

    console.log(taskId, "taskId");
    try {
      const res = await taskSvc.patchTask(taskId, {
        title: editInput,
        description: editDescription,
        file: editFile,
      });
      // console.log(res);

      const updatedTask = res.data.data;
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updatedTask : task)),
      );
      setEditingTaskId("");
      setEditInput("");
      setEditDescription("");
      setEditFile(undefined);
    } catch (error) {
      console.error(`Failed to edit task, ${error}`);
    }
  };

  const Logout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  //
  const handleNotificationOpen = async () => {
    setNotificationOpen((prev) => !prev);

    const response = await notificationSvc.patchNotification();
    console.log(response);

    setNotification((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notification.filter((n) => !n.read).length;

  useEffect(() => {
    if (!tokenReady) return;
    const fetchTasks = async () => {
      try {
        const res = await getTasks();

        setTasks(res.data.data);
      } catch (error) {
        console.error(`Failed to fetch Tasks, ${error}`);
      }
    };
    fetchTasks();
  }, [tokenReady]);

  useEffect(() => {
    const getNotification = async () => {
      try {
        const response = await notificationSvc.getNotification();
        const notification: INotificationProps[] = response.data.data;
        setNotification(notification);
      } catch (error) {
        console.log(error, "getNotification error");
      }
    };

    getNotification();

    socket.on("notification-added", (notification) => {
      // console.log("New notification", notification);
      setNotification((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off("notification-added");
    };
  }, []);

  return (
    <div className="min-h-screen bg-white p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
        <div className="logo flex items-center border-b border-l border-gray-400 shadow-sm">
          <div className="flex border-2 items-center w-full justify-between p-3 sm:p-4 md:pr-8">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-manrope truncate">
                Task Manager Pro
              </h3>
            </div>
            <div className="relative cursor-pointer left-90">
              <FaRegBell
                className="text-2xl"
                onClick={handleNotificationOpen}
              />
              {unreadCount > 0 && (
                <span
                  className={`absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2`}
                >
                  {unreadCount}
                </span>
              )}

              <div
                className={`absolute top-8 right-0  bg-white border shadow-lg rounded-xl p-3 w-64 max-h-96 overflow-y-auto ${notificationOpen ? "block" : "hidden"}`}
              >
                {notification.length === 0 ? (
                  <p className="text-sm text-gray-500">No notifications</p>
                ) : (
                  notification.map((n) => (
                    <div key={n._id} className="border-b py-1">
                      <p className="text-sm">{n.message}</p>
                      <span className="text-xs text-gray-400">
                        {dayjs(n.createdAt).format("MMM D, YYYY h:mm A")}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
            <IoExitOutline
              onClick={Logout}
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 shrink-0  cursor-pointer"
            />
          </div>
        </div>

        <div>
          <MeasureBox tasks={tasks} />
        </div>

        <div>
          <AddBar
            inputChange={inputChange}
            input={input}
            addTask={addTask}
            description={description}
            descriptionChange={descriptionChange}
            fileChange={fileChange}
          />
        </div>

        <div>
          <Taskbar
            tasks={tasks}
            deleteTask={handleDeleteTask}
            onCompleted={handleCompletedTasks}
            editingTaskId={editingTaskId}
            onEditClick={onEditClick}
            onEditCancel={onEditCancel}
            editInputChange={editInputChange}
            onEditSubmit={onEditSubmit}
            editInput={editInput}
            setFilter={setFilter}
            filteredTasks={filteredTasks}
            editDescription={editDescription}
            editDescriptionChange={editDescriptionChange}
            editFileChange={editFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Base;
