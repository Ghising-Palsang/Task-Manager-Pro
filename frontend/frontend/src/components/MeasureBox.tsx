import { FaRegCircle, FaTasks } from "react-icons/fa";
import { FaRegCircleCheck, FaRegCircleDot } from "react-icons/fa6";
import type { ITasks } from "./Base";

export interface IMeasureBox {
  tasks: ITasks[]
}

const MeasureBox =  ({tasks}: IMeasureBox) => {

  const totalCounts = tasks.length
  const completedCounts = tasks.filter(t=> t.status === "completed").length
  const activeCounts = tasks.filter(t=> t.status === "active").length
  
  const progress = totalCounts ? Math.round(completedCounts/totalCounts * 100) : 0
  const cards = [
    { label: "Total Tasks", count: totalCounts, icon: FaTasks },
    { label: "Active", count: activeCounts, icon: FaRegCircle },
    {
      label: "Completed",
      count: completedCounts,
      icon: FaRegCircleCheck,
    },
    { label: "Progress", count: progress, icon: FaRegCircleDot },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="border-2 border-gray-300 shadow-md p-4 sm:p-6 rounded-2xl flex justify-between items-center"
          >
            <div className="text-lg sm:text-2xl text-gray-500">
              {card.label}
              <p className="font-semibold">{card.count}</p>
            </div>
            <Icon className="text-3xl sm:text-4xl shrink-0" />
          </div>
        );
      })}
    </div>
  );
};

export default MeasureBox;
