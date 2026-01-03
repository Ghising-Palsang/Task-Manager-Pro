interface InputProps {
  input: string;
  inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
}

const AddBar = ({ input, inputChange, addTask }: Readonly<InputProps>) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };



  return (
    <div className="border-2 p-4 sm:p-8 border-gray-300 shadow-md rounded-lg">
      <form
        className="flex flex-col sm:flex-row gap-2 w-full"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          placeholder="What needs to be done?"
          className="bg-[#f3f3f5] p-3 rounded-2xl w-full"
          value={input}
          onChange={inputChange}
        />
        <button
          onClick={addTask}
          className="bg-[#818089] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl w-full sm:w-auto whitespace-nowrap"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddBar;
