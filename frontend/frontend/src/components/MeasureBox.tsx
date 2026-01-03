import { FaRegCircle, FaTasks } from "react-icons/fa";
import { FaRegCircleCheck, FaRegCircleDot } from "react-icons/fa6";

const MeasureBox = () => {
  const cards = [
    { label: "Total Tasks", count: "1", icon: FaTasks },
    { label: "Active", count: "1", icon: FaRegCircle },
    { label: "Completed", count: "1", icon: FaRegCircleCheck },
    { label: "Progress", count: "1", icon: FaRegCircleDot },
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
