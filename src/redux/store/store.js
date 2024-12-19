//is store ko hum web ko redux se connect karenge
import { createStore , combineReducers, applyMiddleware} from "redux";
import { thunk } from "redux-thunk";
<<<<<<< HEAD:src/redux/store.js
//thunk is a middleware when we call our api thunk is used
import { composeWithDevTools } from "redux-devtools-extension";
import { getProductsReducer } from "./reducers/productReducer";
import {cartReducer} from './reducers/cartReducer'
import { fetchProducts } from "./actions/productAction";
//we will pass two argumnets to the create store reducer(action item) and middleware
const reducer = combineReducers({
    fetchProducts : getProductsReducer,
    cart:cartReducer
=======
import { composeWithDevTools } from "@redux-devtools/extension"; 
import { fetchProductDetailsReducer, fetchProductReducer} from "../reducers/productReducer";

import AdminProductsSlice from './seller/products-slice/index'
import { fetchProductDetails} from "../actions/productAction";
import { fetchProducts } from "../actions/productAction";
//we will pass two argumnets to the create store reducer(action item) and middleware
const reducer = combineReducers({
    fetchProducts : fetchProductReducer,
    fetchProductDetails : fetchProductDetailsReducer,
    adminProducts:AdminProductsSlice,
>>>>>>> 6f758e615d7666b5a4b412e835c88c7d1c3c6180:src/redux/store/store.js
})
const middleware =[thunk];
const store = createStore(//... is rest operator
    reducer,composeWithDevTools(applyMiddleware(...middleware))
)
export default store;
//we can sync our local project with redux dev tool extension using npm i redux-devtools-extension on the terminal