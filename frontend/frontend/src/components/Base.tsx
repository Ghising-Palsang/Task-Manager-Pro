import { useState } from "react";
import AddBar from "./AddBar";
import MeasureBox from "./MeasureBox";
import Taskbar from "./Taskbar";




const Base = () => {
  const [input, setInput] = useState<string>("");


  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

 const [task, setTask] = useState<string[]>([])


 const addTask = () => {
  if(input.trim() === "") return;
  setTask([...task, input])
  setInput("")
 } 

  return (
    <div className="h-screen p-6 px-20">
      <div className="flex flex-col gap-8 ">
        <div className="logo flex items-center border-b border-l border-gray-400 shadow-md  ">
          <div>
            <img
              src="../../src/assets/images/taskmanager.png"
              alt="task manager"
              className="w-30 "
            />
          </div>
          <div className="">
            <h3 className="text-3xl font-manrope">Task Manager Pro</h3>
          </div>
        </div>

        <div>
          <MeasureBox />
        </div>

        <div>
          <AddBar  inputChange={inputChange} input={input} addTask={addTask} />
        </div>
        <div>
          <Taskbar task={task}  />
        </div>
      </div>
    </div>
  );
};

export default Base;
