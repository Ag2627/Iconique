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
import WishList from "./components/wishlist/WishList";
import SellerProfilePage from "./components/Seller/SellerProfilePage";
import Checkout from "./components/Checkout/Checkout";
import SellerData from "./components/Followers/SellerData";
import OrderDetails from "./components/Orders/OrderDetails";
import { PaymentSuccess } from "./components/Payment/PaymentSuccess";

const router=createBrowserRouter([
  {path:'',element:<UserDashboard/>,children:[
    {path:'',element:<Home/>},
    {path:'product/:id',element:<DetailView/>},
    {path:'wishlist',element:<WishList/>},
    {path :'/cart',element :<Cart/>},
    {path:'about', element:<AboutUs/>},
    {path:'/sellerDetails',element:<SellerData/>},
    {path:'contact',element:<ContactUs/>},
    {path:'profile/*',element:<ViewProfile/>},
    {path:'my-orders',element:<UserOrder/>},
    {path:'/checkout',element:<Checkout/>},
    {path:'/order-details',element:<OrderDetails/>},
    {path:'/payment/success-page',element:<PaymentSuccess/>}
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
    {path:'profile',element:<SellerProfilePage/>},
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
