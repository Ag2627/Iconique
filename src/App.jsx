import Home from "./components/Home/Home"
import AboutUs from "./components/AboutUs/AboutUs"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserDashboard from "./components/User/UserDashboard";
import SellerDashboard from "./components/Seller/SellerDashboard";
import { Toaster } from "./components/ui/toaster";
const router=createBrowserRouter([
  {path:'',element:<UserDashboard/>,children:[
    {path:'',element:<Home/>},
    {path:'about', element:<AboutUs/>},
  ]},
  {path:'/seller',element:<SellerDashboard/>},
])
function App() {

  return (
    <>
    <Toaster/>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
