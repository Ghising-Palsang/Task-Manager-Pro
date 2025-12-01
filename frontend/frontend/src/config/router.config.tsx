import { createBrowserRouter, RouterProvider } from "react-router"
import Base from "../components/Base";

const routerPath = createBrowserRouter([
    {
        path: "/",
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