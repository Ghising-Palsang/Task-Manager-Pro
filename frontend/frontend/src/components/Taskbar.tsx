import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

interface ITaskProps {
  task: string[];
  
}

const Taskbar = ({ task}: ITaskProps) => {
  return (
    <div className="border-2 h-96 border-gray-300 shadow-md px-8 py-6 rounded-2xl">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <button className="bg-[#f3f3f5] text-gray-700 border border-gray-400 shadow-sm px-5 py-2 rounded-2xl font-bold text-lg active:bg-black active:text-white ">
            All Tasks
          </button>
          <button className="bg-[#f3f3f5] border border-gray-400 shadow-sm text-gray-700 px-5 py-2 rounded-2xl font-bold text-lg active:bg-black active:text-white flex gap-3">
            Active
            <p className="border border-gray-400 px-2 shadow-sm rounded-lg bg-gray-300 text-gray-500">
              1
            </p>
          </button>
          <button
            className="bg-[#f3f3f5] border border-gray-400 shadow-sm text-gray-700 px-5 py-2 rounded-2xl font-bold text-lg active:bg-black active:text-white"
          >
            Completed
          </button>
        </div>
        <div>
          <ul>
            {task.map((t) => (
              <li className="flex  items-center text-gray-600 justify-between border px-7 py-6 rounded-xl border-gray-400 shadow-md">
                <div className="flex gap-6 items-center">
                  <input type="checkbox" className="h-7 w-7 accent-gray-300 " />
                  <p className="text-xl">{t}</p>
                </div>
                <div className="flex gap-5">
                  <FaPencilAlt className="text-xl" />
                  <FaRegTrashCan className="text-xl" />
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
