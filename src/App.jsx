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
import ViewProfile from "./components/Profile/ViewProfile";
import DataProvider from "./context/DataProvider";
import DetailView from "./components/Details/DetailView";
import ContactUs from './components/ContactUs/ContactForm'
import SellerPrivateRoute from "./components/Seller/SellerPrivateRoute";
import SellerLogin from "./components/login/SellerLogin";
import Cart from "./components/cart/Cart";
import UserOrder from "./components/Orders/UserOrder";
import SellerProfile from "./components/Seller/SellerProfile";
import WishList from "./components/wishlist/WishList";
import PaymentComponent from "./components/PaymentComp/PaymentComponent.jsx";
import Checkout from "./components/Checkout/Checkout";

const router=createBrowserRouter([
  {path:'',element:<UserDashboard/>,children:[
    {path:'',element:<Home/>},
    {path:'product/:id',element:<DetailView/>},
    {path:'wishlist',element:<WishList/>},
    {path :'/cart',element :<Cart/>},
    {path:'about', element:<AboutUs/>},
    {path:'contact',element:<ContactUs/>},
    {path:'profile/*',element:<ViewProfile/>},
    {path:'my-orders',element:<UserOrder/>},
    {path:'/payment',element:<PaymentComponent/>},
    {path:'/checkout',element:<Checkout/>},
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
    {path:'profile',element:<SellerProfile/>},
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
