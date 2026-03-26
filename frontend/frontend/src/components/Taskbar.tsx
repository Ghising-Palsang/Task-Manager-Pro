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
  onEditClick: (task: ITasks) => void;
  onEditCancel: () => void;
  editInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEditSubmit: (taskId: string) => void;
  editInput: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filteredTasks: ITasks[];
  editDescription: string;
  editDescriptionChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  editFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  editDescription,
  editDescriptionChange,
  editFileChange,
}: ITaskProps) => {
  const [selected, setSelected] = useState<"all" | "active" | "completed">(
    "all",
  );

  const [deleteId, setDeleteId] = useState<string | null>();

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

  const handleDeleteMenu = (taskId : string) => {
    setDeleteId(taskId)
  }

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
                  <div className="flex  items-center justify-between w-full gap-5">
                    <input
                      type="text"
                      className="h-5 py-8  w-2/5 px-2 text-xl bg-gray-100 rounded-2xl"
                      onChange={editInputChange}
                      value={editInput}
                    />

                    <textarea
                      placeholder="Task description"
                      className="bg-[#f3f3f5] p-3 rounded-2xl w-3/4"
                      value={editDescription}
                      onChange={editDescriptionChange}
                    />

                    <input
                      type="file"
                      className="w-1/5 bg-gray-300 p-2 rounded-2xl"
                      onChange={editFileChange}
                    />
                    <div className="w-1/12 flex gap-2 items-center justify-center">
                      <IoMdCheckmark
                        className="text-base sm:text-lg md:text-2xl cursor-pointer"
                        onClick={() => onEditSubmit(task._id)}
                      />
                      <FaXmark
                        className="text-base sm:text-lg md:text-2xl cursor-pointer"
                        onClick={onEditCancel}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2 justify-between w-full px-2 py-2 md:py-5">
                      {/* Left: Checkbox */}
                      <input
                        type="checkbox"
                        className="h-5 w-5 md:h-6 md:w-6 accent-gray-300 shrink-0"
                        checked={task.status === "completed"}
                        onChange={() => onCompleted(task._id)}
                      />

                      {/* Center: Title */}
                      <div
                        className={`flex flex-col gap-2  w-4/5 bg-gray-100 rounded-2xl p-2 items-center justify-between text-sm sm:text-base md:text-xl wrap-break-word ${
                          task.status === "completed" ? "line-through" : ""
                        }`}
                      >
                        <p className="text-2xl font-semibold max-w-full">
                          {task.title}
                        </p>
                        <p className="w-full">{task.description || null}</p>
                        <span className="max-w-full">
                          {task.file && task.file.thumbUrl && (
                            <img src={task.file.thumbUrl} />
                          )}
                        </span>
                      </div>

                      {/* Right: Edit and Delete Icons */}
                      <div className="flex gap-3 sm:gap-4 md:gap-5 relative">
                        <FaPencilAlt
                          className="text-base sm:text-lg md:text-xl cursor-pointer"
                          onClick={() => onEditClick(task)}
                        />
                        <FaRegTrashCan
                          className="text-base sm:text-lg md:text-xl cursor-pointer"
                          // onClick={() => deleteTask(task._id)}
                          onClick={() => handleDeleteMenu(task._id)}
                        />

                        {deleteId === task._id && (
                          <div className="absolute top-8 right-0 bg-white border shadow-lg rounded-xl p-3 flex flex-col gap-2 z-10">
                            <p className="text-sm">Delete task?</p>

                            <div className="flex gap-2">
                              <button
                                className="px-3 py-1 bg-green-200 rounded"
                                onClick={() => setDeleteId(null)}
                              >
                                No
                              </button>

                              <button
                                className="px-3 py-1 bg-red-500 text-white rounded"
                                onClick={() => {
                                  deleteTask(task._id);
                                  setDeleteId(null);
                                }}
                              >
                                Yes
                              </button>
                            </div>
                          </div>
                        )}
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
