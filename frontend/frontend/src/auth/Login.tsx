import { useForm } from "react-hook-form";
import { FormInput, PasswordInput } from "../form/input";
import { useState } from "react";
import { Spin } from "antd";
import authSvc from "../service/auth.service";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { setAccessToken } from "../config/axios.config";

export interface ILoginProps {
  email: string;
  password: string;
}

export const LoginDTO = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,25}$/,
      "8-25 chars, upper/lower/num/symbol"
    )
    .required("Password is required"),
});

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<ILoginProps>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(LoginDTO),
  });
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const loginFormSubmit = async (data: ILoginProps) => {
    setLoading(true);

    try {
      const response = await authSvc.loginUser(data);
      console.log(response);
      const accessToken = response.data?.data?.accessToken
      // console.log(accessToken)

      setAccessToken(accessToken)
       
      navigate("/homepage")
    } catch (error: any) {
      console.log(error);
      const msg = error.response?.data?.message;
      if (msg.toLowerCase().includes("email")) {
        setError("email", {
          type: "manual",
          message: error.response?.data?.message || "Incorrect email",
        });
      } else if (msg.toLowerCase().includes("password")) {
        setError("password", {
          type: "manual",
          message: error.response?.data?.message || "Incorrect password",
        });
      }
    } finally {
      setLoading(false);
    }
   
  };

  return (
    <>
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
          <div className="w-full max-w-md border-2 rounded-lg sm:rounded-2xl shadow-lg sm:shadow-2xl flex flex-col items-center justify-start gap-8 sm:gap-10 p-6 sm:p-8 bg-white">
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src="../../src/assets/images/taskmanager.png"
                className="w-20 sm:w-28 lg:w-40"
                alt="Task Manager"
              />
              <h1 className="text-2xl sm:text-3xl font-bold mt-4">
                Welcome User
              </h1>
              <h3 className="text-sm sm:text-base lg:text-lg mt-2 text-gray-600">
                Sign in to your task manager account
              </h3>
            </div>

            <form
              className="w-full flex flex-col gap-6 sm:gap-7"
              onSubmit={handleSubmit(loginFormSubmit)}
            >
              <div className="flex flex-col gap-2 text-gray-600 relative">
                <label className="text-base sm:text-lg lg:text-xl font-medium">
                  Email Address
                </label>
                <FormInput
                  control={control}
                  name="email"
                  error={errors.email?.message}
                  type="email"
                  rules={{ required: "Email is required" }}
                />
              </div>

              <div className="flex flex-col gap-2 text-gray-600 relative">
                <label className="text-base sm:text-lg lg:text-xl font-medium">
                  Password
                </label>
                <PasswordInput
                  control={control}
                  name="password"
                  error={errors.password?.message}
                  rules={{ required: "Password is required" }}
                />
              </div>

              <div className="flex flex-row sm:flex-row justify-between gap-3 sm:gap-2 sm:items-center mt-4">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 sm:h-5 sm:w-5 accent-purple-500 cursor-pointer"
                  />
                  <label className="text-sm  sm:text-base lg:text-lg text-gray-600">
                    Remember me
                  </label>
                </div>
                <a
                  href="/forgotPassword"
                  className="text-purple-900 text-sm sm:text-base lg:text-lg font-semibold hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <button className="w-full p-3 sm:p-4 rounded-lg sm:rounded-2xl text-white bg-purple-600 text-base sm:text-lg lg:text-xl font-semibold hover:bg-purple-700 transition-colors">
                Sign In
              </button>
            </form>

            <div className="text-sm sm:text-base lg:text-lg text-center">
              Don't have an account?{" "}
              <a
                href="/signUp"
                className="text-purple-900 font-semibold hover:underline"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
