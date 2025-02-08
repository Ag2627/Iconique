//is store ko hum web ko redux se connect karenge
import { createStore , combineReducers, applyMiddleware} from "redux";
import {thunk} from "redux-thunk";

//thunk is a middleware when we call our api thunk is used
import { composeWithDevTools } from "@redux-devtools/extension";
import { fetchProductDetailsReducer, fetchProductReducer} from "../reducers/productReducer";

import shopCartSlice  from "./cart-slice"
import shoppingOrderSlice from "./product-slice"

//we will pass two argumnets to the create store reducer(action item) and middleware
import AdminProductsSlice from '../store/seller/products-slice/index'
import addressSlice from '../store/address/index'
import userSlice from '../store/profile/index'
import reviewSlice from '../store/review-slice/index'
import wishlistSlice from '../store/wishlist-slice/index'
import sellerSlice from '../store/seller-pofile/index'
import statsSlice from '../store/overviewSlice/index'
import sellerOrderSlice from '../store/seller/order-slice/index'
//we will pass two argumnets to the create store reducer(action item) and middleware
const reducer = combineReducers({
    fetchProducts : fetchProductReducer,
    fetchProductDetails : fetchProductDetailsReducer,
    Address:addressSlice,
    profile:userSlice,
    sellerProfile:sellerSlice,
    review:reviewSlice,
    stats:statsSlice,
    wishlist:wishlistSlice,
    adminProducts:AdminProductsSlice,
    shopCart : shopCartSlice,
    shoppingOrder:shoppingOrderSlice,
    sellerOrder:sellerOrderSlice,
})
const middleware =[thunk];
const store = createStore(//... is rest operator
    reducer,composeWithDevTools(applyMiddleware(...middleware))
)
export default store;
//we can sync our local project with redux dev tool extension using npm i redux-devtools-extension on the terminal