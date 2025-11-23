import { createBrowserRouter, RouterProvider } from "react-router"

const routerPath = createBrowserRouter([
    {
        path: "/",
        
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