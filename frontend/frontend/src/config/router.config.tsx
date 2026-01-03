import { createBrowserRouter, RouterProvider } from "react-router"
import Base from "../components/Base";
import Login from "../auth/Login";
import UserRegister from "../auth/UserRegister";
import ForgotPassword from "../auth/ForgotPassword";
import ActivateUser from "../auth/ActivateUser";
import CheckEmail from "../auth/CheckEmail";

const routerPath = createBrowserRouter([
   
    {
        path:'/',
        Component: Login
    },
    {
        path:'/signUp',
        Component: UserRegister
    },{
        path: "/checkEmail",
        Component: CheckEmail
    },
    {
        path:"/forgotPassword",
        Component: ForgotPassword
    },
    {
        path:"/activate",
        Component: ActivateUser
    }
    ,

    {
        path: "/homepage",
        element: <Base/>
        
    }
])


const RouterConfig = () => {
    return(
        <>
        <RouterProvider  router={routerPath}/>
        </>
    )
}

export default RouterConfig;