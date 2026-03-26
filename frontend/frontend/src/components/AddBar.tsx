interface InputProps {
  input: string;
  inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
  description: string;
  descriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  fileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddBar = ({
  input,
  inputChange,
  addTask,
  description,
  descriptionChange,
  fileChange
}: Readonly<InputProps>) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="border-2 p-4 sm:p-8 border-gray-300 shadow-md rounded-lg">
      <form
        className="flex flex-col items-center sm:flex-row gap-2 w-full"
        onSubmit={onSubmit}
      >
        {/* title */}
        <input
          type="text"
          placeholder="What needs to be done?"
          className="bg-[#f3f3f5] p-3 rounded-2xl 2/5"
          value={input}
          onChange={inputChange}
        />
        {/* description */}
        <textarea
          placeholder="Task description"
          className="bg-[#f3f3f5] p-3 rounded-2xl w-full"
          value={description}
          onChange={descriptionChange}
        />

        {/* file uploading */}
        <input
          type="file"
          className="bg-gray-400 p-3 rounded-2xl w-1/5 cursor-pointer"
          onChange={fileChange}
        />
        <button
          onClick={addTask}
          className="bg-black text-white px-6 cursor-pointer sm:px-8 py-3 sm:py-4 rounded-xl w-full sm:w-auto whitespace-nowrap hover:bg-green-200 hover:text-black"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddBar;
