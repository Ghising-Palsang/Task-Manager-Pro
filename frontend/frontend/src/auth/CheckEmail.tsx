import { IoArrowBack } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { useLocation } from "react-router";


const CheckEmail = () => {
    const {state} = useLocation()
    const email = state?.email
  return (
    <div className="px-6 text-center h-screen  flex items-center justify-center">
      <div className="flex flex-col  items-center border px-3 py-10 gap-4 rounded-2xl shadow-2xl sm:py-16 sm:px-6 ">
        <TfiEmail className="w-27 h-25 border shadow-2xl border-green-900 bg-green-300 p-6 rounded-full sm:mb-3" />

        <h1 className="text-3xl ">Check Your Email</h1>
        <p className="text-xl text-gray-400">
          We've sent a verfication link to
        </p>
        {email ? (
          <p className="text-xl text-green-900 sm:text-2xl">{email}</p>
        ) : (
          <p className="text-xl text-green-900 sm:text-2xl">User@gmail.com</p>
        )}
        <p className="text-gray-400 sm:text-lg">
          Click the link in your email to verify your account and get started.
        </p>
        <p className="text-gray-400 sm:text-lg">
          If you don't see the email check in your Spam folder.
        </p>

        <a href="/"><button className="flex shadow-2xl gap-4 items-center cursor border p-3 rounded-2xl border-green bg-green-300 mt-6"><IoArrowBack/>  Back to login</button></a>
      </div>
    </div>
  );
}

export default CheckEmail