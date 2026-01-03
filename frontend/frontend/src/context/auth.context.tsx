import { Spin } from "antd";
import React, { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import authSvc from "../service/auth.service";
import { getToken } from "../config/axios.config";

export interface ILoggedInUser {
    _id: string,
    name: string,
    email:string,
    role: string
} 

export interface  IAuthContext {
    loggedInUser: ILoggedInUser | null,
    setLoggedInUser:Dispatch<SetStateAction<ILoggedInUser | null>>,
    loading: boolean,
}

export interface IAuthProvider {
    children: React.ReactNode
}

const AuthContext = createContext<IAuthContext>({
    loggedInUser: null,
    setLoggedInUser: () => {},
    loading: true
});

export const AuthProvider = ({children}:IAuthProvider) => {
    const [loggedInUser, setLoggedInUser] = useState<ILoggedInUser | null>(null)
    const [loading, setLoading] = useState(true)

    const getLoggedInUser = async() => {
        setLoading(true)
        try {
            const response = await authSvc.loggedInUser()
            if(response){
                setLoggedInUser(response.data)
            }
            console.log(response)
        } catch (error) {
            console.log(`Failed to fetch user ${error}`)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=> {
       const token = getToken()
    //    console.log(`get token is working ${token}`)
       if(token){
        getLoggedInUser()
       }else{
        setLoading(false)
       }
    },[])

    return loading ? (
      <div className="p-4">
        <div className="h-screen flex items-center justify-center">
          <Spin size="large" />
        </div>
      </div>
    ) : (
      <AuthContext.Provider value={{loggedInUser:loggedInUser, setLoggedInUser: setLoggedInUser, loading}}>
        {children}
      </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const {loggedInUser, loading} = useContext(AuthContext)
    return {
        loggedInUser, loading
    }
}