interface InputProps {
  input: string;
  inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
}

const AddBar = ({ input, inputChange, addTask }:Readonly<InputProps>) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="border-2 p-8 border-gray-300 shadow-md rounded-lg">
      <form className="flex gap-2 w-full" onSubmit={onSubmit}>
        <input
          type="type"
          placeholder="What needs to be done?"
          size={100}
          className="bg-[#f3f3f5] p-3 rounded-2xl w-full"
          value={input}
          onChange={inputChange}
        />
        <button
        onClick={addTask}
          className="bg-[#818089] text-white px-8 py-4 rounded-xl max-w-1/8 w-1/8"
         
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddBar;
