import { FaRegTrashCan, FaXmark } from "react-icons/fa6";
import type { ITasks } from "./Base";
import { IoMdCheckmark } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";

interface ITaskProps {
  tasks: ITasks[];
  deleteTask: (taskId: string) => void;
  onCompleted: (id: string) => void;
  editingTaskId: string;
  onEditClick: (taskId: string, title: string) => void;
  onEditCancel: () => void;
  editInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEditSubmit: (taskId: string) => void;
  editInput: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filteredTasks: ITasks[];
}

const Taskbar = ({
  deleteTask,
  onCompleted,
  editingTaskId,
  onEditClick,
  onEditCancel,
  editInputChange,
  onEditSubmit,
  editInput,
  setFilter,
  filteredTasks,
}: ITaskProps) => {
  const [selected, setSelected] = useState<"all" | "active" | "completed">("all");

  const activeClick = () => {
    setFilter("active");
    
    setSelected("active");
  };

  const completedClick = () => {
    setFilter("completed");
    setSelected("completed");
  };

  const allClick = () => {
    setFilter("all");
    setSelected("all");
  };

  return (
    <div className="border-2 h-auto border-gray-300 shadow-md px-4 py-4 sm:px-6 md:px-8 md:py-6 rounded-2xl">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
          <button
            onClick={allClick}
            className={`border border-gray-400 shadow-sm px-3 py-2 sm:px-4 md:px-5 rounded-2xl font-bold text-xs sm:text-sm md:text-lg  ${selected === "all" ? "text-white bg-black" : "bg-[#f3f3f5] text-gray-700 "}`}
          >
            All Tasks
          </button>

          <button
            onClick={activeClick}
            className={`border border-gray-400 shadow-sm px-3 py-2 sm:px-4 md:px-5 rounded-2xl font-bold text-xs sm:text-sm md:text-lg  ${selected === "active" ? "text-white bg-black" : "bg-[#f3f3f5] text-gray-700 "}`}
          >
            Active
          </button>

          <button
            onClick={completedClick}
            className={`border border-gray-400 shadow-sm px-3 py-2 sm:px-4 md:px-5 rounded-2xl font-bold text-xs sm:text-sm md:text-lg  ${selected === "completed" ? "text-white bg-black" : "bg-[#f3f3f5] text-gray-700 "}`}
          >
            Completed
          </button>
        </div>
        <div className="overflow-y-auto max-h-64 md:max-h-96">
          <ul className="space-y-2 md:space-y-3">
            {filteredTasks.map((task) => (
              <li
                key={task._id}
                className="flex flex-col sm:flex-row items-start sm:items-center text-gray-600 justify-between border px-3 py-3 sm:px-5 md:px-7 md:py-2 rounded-xl border-gray-400 shadow-md gap-3 sm:gap-4 w-full"
              >
                {editingTaskId === task._id ? (
                  <div className="flex sm:gap-4 items-center  sm:w-full gap-3 md:gap-5 ml-8 sm:ml-0">
                    <input
                      type="text"
                      placeholder="Update task"
                      className="h-5 py-8  w-full px-2 text-xl"
                      onChange={editInputChange}
                      value={editInput}
                    />
                    <IoMdCheckmark
                      className="text-base sm:text-lg md:text-2xl cursor-pointer"
                      onClick={() => onEditSubmit(task._id)}
                    />
                    <FaXmark
                      className="text-base sm:text-lg md:text-2xl cursor-pointer"
                      onClick={onEditCancel}
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between w-full px-2 py-2 md:py-5">
                      {/* Left: Checkbox */}
                      <input
                        type="checkbox"
                        className="h-5 w-5 md:h-6 md:w-6 accent-gray-300 shrink-0"
                        checked={task.status === "completed"}
                        onChange={() => onCompleted(task._id)}
                      />

                      {/* Center: Title */}
                      <p
                        className={`flex-1 text-center text-sm sm:text-base md:text-xl wrap-break-word ${
                          task.status === "completed" ? "line-through" : ""
                        }`}
                      >
                        {task.title}
                      </p>

                      {/* Right: Edit and Delete Icons */}
                      <div className="flex gap-3 sm:gap-4 md:gap-5">
                        <FaPencilAlt
                          className="text-base sm:text-lg md:text-xl cursor-pointer"
                          onClick={() => onEditClick(task._id, editInput)}
                        />
                        <FaRegTrashCan
                          className="text-base sm:text-lg md:text-xl cursor-pointer"
                          onClick={() => deleteTask(task._id)}
                        />
                      </div>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
