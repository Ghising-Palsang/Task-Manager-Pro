import { FaRegCircle, FaTasks } from "react-icons/fa"
import { FaRegCircleCheck, FaRegCircleDot } from "react-icons/fa6";


const MeasureBox = () => {
  return (
    <div className=" flex justify-between">
      <div className=" border-2 border-gray-300 shadow-md  w-78 h-30  flex justify-between px-6 py-4 rounded-2xl">
        <div className="text-2xl text-gray-500">
          Total Tasks
          <p className="">1</p>
        </div>

        <FaTasks className="inline-block text-4xl mt-3  " />
      </div>

      <div className=" border-2 border-gray-300 shadow-md   w-78 h-30 flex justify-between px-6 py-4 rounded-2xl">
        <div className="text-2xl text-gray-500">
          Active
          <p className="">1</p>
        </div>

        <FaRegCircle className="inline-block text-4xl mt-3  " />
      </div>

      <div className=" border-2 border-gray-300 shadow-md  w-78 h-30 flex justify-between px-6 py-4 rounded-2xl">
        <div className="text-2xl text-gray-500">
          Completed
          <p className="">1</p>
        </div>

        <FaRegCircleCheck className="inline-block text-4xl mt-3  " />
      </div>

      <div className=" border-2 border-gray-300 shadow-md  w-78 h-30  flex justify-between px-6 py-4 rounded-2xl">
        <div className="text-2xl text-gray-500">
          Progress
          <p className="">1</p>
        </div>

        <FaRegCircleDot className="inline-block text-4xl mt-3  " />
      </div>
    </div>
  );
}

export default MeasureBox