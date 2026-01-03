import { useForm } from "react-hook-form";
import { ConfirmPasswordInput, FormInput, PasswordInput, SelectInput } from "../form/input";
import authSvc from "../service/auth.service";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Spin } from "antd";
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";


export interface ISignUpProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}


export const RegisterDTO = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,25}$/,
      "8–25 chars, upper/lower/num/symbol"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  role: Yup.string().required("Role is required"),
});

const UserRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISignUpProps>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
   
    resolver: yupResolver(RegisterDTO)
  });

  const onSubmit = async (data: ISignUpProps) => {
    setLoading(true)
    try {
      const response = await authSvc.registerUser(data);
      console.log(response);
      navigate("/checkEmail", {
        state: {
          email: response.data.data.email,
        },
      });
    } catch (error) {
      console.error("Registration failed:", error);
    }finally{
      setLoading(false)
    }
  };

  return (
    <>
      {loading ? (
        <div className="p-4">
          <div className="h-screen flex items-center justify-center">
            <Spin size="large" />
          </div>
        </div>
      ) : (
        <div className="min-h-screen p-2 flex items-center justify-center bg-gray-50">
          <div className="w-full max-w-md border-2 border-red-900 rounded-xl shadow-lg flex flex-col items-center gap-6 p-6 bg-white">
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src="../../src/assets/images/taskmanager.png"
                className="w-20 h-auto"
                alt="Task Manager"
              />
              <h1 className="text-2xl font-bold mt-3">Create Your Account</h1>
              <h3 className="text-sm text-gray-600 mt-2">
                Manage tasks efficiently
              </h3>
            </div>

            <form
              className="w-full flex flex-col gap-7"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <FormInput
                  name="name"
                  control={control}
                  error={errors.name?.message}
                  rules={{ required: "Full name is required" }}
                  type="text"
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <FormInput
                  control={control}
                  error={errors.email?.message}
                  name="email"
                  type="email"
                  rules={{ required: "Email is required" }}
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <PasswordInput name="password" control={control} error={errors.password?.message} rules={{required: "Password is required"}}/>
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <ConfirmPasswordInput name="confirmPassword" control={control} error={errors.confirmPassword?.message} rules={{required: "Confirm Password is required"}}/>
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-medium text-gray-700">
                  Role
                </label>
                <SelectInput
                  name="role"
                  control={control}
                  error={errors.role?.message}
                  rules={{ required: "Role is required" }}
                />
              </div>

              <div className="flex justify-between items-center text-sm gap-2 my-2">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-purple-500 cursor-pointer"
                  />
                  <label className="text-gray-600">Remember me</label>
                </div>
                <a
                  href="/forgotPassword"
                  className="text-purple-900 font-semibold hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <button className="w-full p-3 rounded-lg text-white bg-purple-600 text-base font-medium hover:bg-purple-700 transition">
                Sign Up
              </button>
            </form>

            <div className="text-center text-sm text-gray-600">
              Already have an account?
              <a
                href="/"
                className="text-purple-600 font-semibold hover:underline ml-1"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserRegister;
