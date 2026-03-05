import { useEffect, useMemo, useState } from "react";
import AddBar from "./AddBar";
import MeasureBox from "./MeasureBox";
import Taskbar from "./Taskbar";
import { IoExitOutline } from "react-icons/io5";

import { useNavigate } from "react-router";
import taskSvc from "../service/task.service";
import { useToken } from "../context/token.contex";

export interface ITasks {
  _id: string;
  title: string;
  description: string;
  status: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

const Base = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState<string>("");
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const [editInput, setEditInput] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<string>("");
 

  const [filter , setFilter] = useState<string>("all");


  const { logout, tokenReady } = useToken();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const editInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInput(e.target.value);
  };

  const getTasks = async () => {
    const response = await taskSvc.getTasks();
    console.log(response);
    return response;
  };
  
  

  const filteredTasks = useMemo(()=> {
    if(filter === "active"){
      return tasks.filter(t => t.status === "active")
    }else if (filter === "completed"){
      return tasks.filter(t => t.status === "completed")
    }
    return tasks
  }, [tasks, filter])



  const addTask = async () => {
    if (input.trim() === "") return;

    try {
      const response = await taskSvc.addTask(input);
      console.log(`addTasks response`);
      setTasks((prev) => [...prev, response.data.data]);
      setInput("");
    } catch (error) {
      console.error(`Error adding tasks ${error}`);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await taskSvc.deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error(`Err Deleting task ${error}`);
    }
  };

  const handleCompletedTasks = async (id: string) => {
    const taskToUpdate = tasks.find((t)=> t._id === id)
    if(!taskToUpdate) return;
    const newStatus= taskToUpdate.status === "completed" ? "active" : "completed"
    setTasks((prev) =>
      prev.map((task) => task._id === id ? {...task, status: newStatus} : task)
    );
    try {
      await taskSvc.patchTask(id, {
        status: newStatus,
      });
    } catch (error) {
      console.error(`Failed to patch the status completed, ${error}`);
    }
  };

  const onEditClick = (taskId: string, title: string) => {
    setEditingTaskId(taskId);
    console.log(editingTaskId);
    setEditInput(title ?? "")
  };

  const onEditCancel = () => {
    setEditingTaskId("");
  };

  const onEditSubmit = async (taskId: string) => {
    if(!editInput.trim()) return;
    try {
      await taskSvc.patchTask(taskId, {title: editInput})
      setTasks((prev)=> prev.map((task) => task._id === taskId ? {...task, title: editInput} : task))
      setEditingTaskId("");
      setEditInput("");
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
          <AddBar inputChange={inputChange} input={input} addTask={addTask} />
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
            setFilter = {setFilter}
            filteredTasks={filteredTasks}
          />
        </div>
      </div>
    </div>
  );
};

export default Base;
