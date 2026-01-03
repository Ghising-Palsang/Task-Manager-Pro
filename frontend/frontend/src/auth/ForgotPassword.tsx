import { useForm } from "react-hook-form";
import { FormInput } from "../form/input";
import { IoIosArrowRoundBack } from "react-icons/io";

export interface IForgotPassProps {
  email: string;
}

const ForgotPassword = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IForgotPassProps>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = () => {
    console.log("login form submitted");
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 flex items-center justify-center">
      <div className="w-full max-w-md sm:max-w-sm md:max-w-md lg:w-1/3 border-2 rounded-2xl shadow-2xl flex flex-col items-center gap-8 py-8 sm:py-12 px-6 sm:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <img
            src="../../src/assets/images/taskmanager.png"
            className="w-32 sm:w-40"
          />
          <h1 className="text-xl sm:text-2xl mt-4">Welcome User</h1>
          <h3 className="text-base sm:text-xl mt-2">
            Sign in to your task manager account
          </h3>
        </div>
        <div className="flex flex-col w-full">
          <form
            className="flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2 text-gray-600">
              <label className="text-lg sm:text-xl">Email Address</label>
              <FormInput
                name="email"
                control={control}
                error={errors.email?.message}
                type="email"
                rules={{ required: "Email is required" }}
              />
            </div>

            <button className="border p-3 sm:p-4 rounded-2xl text-white bg-purple-600 text-base sm:text-xl font-semibold hover:bg-purple-700 transition">
              Send Reset instructions
            </button>
          </form>
        </div>
        <div className="text-base sm:text-xl">
          <a
            href="/"
            className="text-purple-900 font-semibold flex gap-4 items-center hover:underline"
          >
            <IoIosArrowRoundBack size={24} className="sm:w-7 sm:h-7" /> Back to
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
