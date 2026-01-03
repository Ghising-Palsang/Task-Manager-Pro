import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import type { ITasks } from "./Base";



interface ITaskProps {
  tasks: ITasks[],
  deleteTask: (taskId: string)=> void,
  onCompleted: (id: string) => void;
}

const Taskbar = ({ tasks, deleteTask, onCompleted }: ITaskProps) => {

  
  
  return (
    <div className="border-2 h-auto border-gray-300 shadow-md px-4 py-4 sm:px-6 md:px-8 md:py-6 rounded-2xl">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
          <button className="bg-[#f3f3f5] text-gray-700 border border-gray-400 shadow-sm px-3 py-2 sm:px-4 md:px-5 rounded-2xl font-bold text-xs sm:text-sm md:text-lg active:bg-black active:text-white">
            All Tasks
          </button>
          <button className="bg-[#f3f3f5] border border-gray-400 shadow-sm text-gray-700 px-3 py-2 sm:px-4 md:px-5 rounded-2xl font-bold text-xs sm:text-sm md:text-lg active:bg-black active:text-white flex gap-2 sm:gap-2 md:gap-3">
            Active
            <p className="border border-gray-400 px-2 shadow-sm rounded-lg bg-gray-300 text-gray-500 text-xs md:text-base">
              1
            </p>
          </button>
          <button className="bg-[#f3f3f5] border border-gray-400 shadow-sm text-gray-700 px-3 py-2 sm:px-4 md:px-5 rounded-2xl font-bold text-xs sm:text-sm md:text-lg active:bg-black active:text-white">
            Completed
          </button>
        </div>
        <div className="overflow-y-auto max-h-64 md:max-h-96">
          <ul className="space-y-2 md:space-y-3">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex flex-col sm:flex-row items-start sm:items-center text-gray-600 justify-between border px-3 py-3 sm:px-5 md:px-7 md:py-6 rounded-xl border-gray-400 shadow-md gap-3 sm:gap-0"
              >
                <div className="flex gap-3 sm:gap-4 md:gap-6 items-center w-full sm:w-auto">
                  <input
                    type="checkbox"
                    className="h-5 w-5 md:h-6 md:w-6 accent-gray-300 shrink-0"
                    checked={task.status === "completed"}
                    onChange={() => onCompleted(task._id)}
                  />
                  <p
                    className={`text-sm sm:text-base md:text-xl wrap-break-words`}
                  >
                    {task.title}
                  </p>
                </div>
                <div className="flex gap-3 sm:gap-4 md:gap-5 ml-8 sm:ml-0">
                  <FaPencilAlt className="text-base sm:text-lg md:text-xl cursor-pointer" />
                  <FaRegTrashCan
                    className="text-base sm:text-lg md:text-xl cursor-pointer"
                    onClick={() => deleteTask(task._id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
