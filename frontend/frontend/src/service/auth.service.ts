import type { ILoginProps } from "../auth/Login";
import type { ISignUpProps } from "../auth/UserRegister";
import axiosConfig from "../config/axios.config";
import { axiosPublic } from "../config/axiosPublic";


class AuthSvc {
  registerUser = async (data: ISignUpProps) => {
    return await axiosConfig.post("auth/userRegister", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  activateUser = async (token: string) => {
    return await axiosConfig.post(`auth/activateUser/${token}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  loginUser = async (data: ILoginProps)=> {
   return await axiosConfig.post("auth/logInUser", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
       
      });
}


logOutUser = async() => {
  return await axiosConfig.post("auth/logOutUser",{}, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}

refreshAccessToken = async() => {
  const response = await axiosPublic.post('auth/refreshToken', {}, {withCredentials: true})
  console.log(response, 'refresh Token')
  return response
}

loggedInUser = async() => {
  return await axiosConfig.get('auth/me', {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
  })
}
}
const authSvc = new AuthSvc();
export default authSvc
