import Home from "./components/Home/Home"
import AboutUs from "./components/AboutUs/AboutUs"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserDashboard from "./components/User/UserDashboard";
import SellerDashboard from "./components/Seller/SellerDashboard";
import { Toaster } from "./components/ui/toaster";
import SellerProducts from "./components/Seller/SellerProducts";
import Order from "./components/Seller/Order";
import Followers from "./components/Seller/Followers";
import SellerOverview from "./components/Seller/SellerOverview";
import EditProfile from "./components/Profile/EditProfile";
import Profile from "./components/Profile/Profile";
import DataProvider from "./context/DataProvider";
import DetailView from "./components/Details/DetailView";
import ContactUs from './components/ContactUs/ContactForm'
import SellerPrivateRoute from "./components/Seller/SellerPrivateRoute";
import SellerLogin from "./components/login/SellerLogin";
const router=createBrowserRouter([
  {path:'',element:<UserDashboard/>,children:[
    {path:'',element:<Home/>},
    
    {path:'product/:id',element:<DetailView/>},
    {path:'about', element:<AboutUs/>},
    {path:'contact',element:<ContactUs/>},
  ]},
  {path:'/seller',element:
  <SellerPrivateRoute>
    <SellerDashboard/>
  </SellerPrivateRoute>
  ,children:[
    {path:'products',element:<SellerProducts/>},
    {path:'overview',element:<SellerOverview/>},
    {path:'orders',element:<Order/>},
    {path:'followers',element:<Followers/>},
    {path:'edit-profile',element:<EditProfile/>},
    {path:'profile',element:<Profile/>},
  ]},
])
function App() {

  return (
    <>
    <DataProvider>
    <Toaster/>
    <RouterProvider router={router}></RouterProvider>
    </DataProvider>
    </>
  )
}

export default App
