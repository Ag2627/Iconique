//is store ko hum web k redux se connect karenge
import { createStore , combineReducers, applyMiddleware} from "redux";
import { thunk } from "redux-thunk";
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
})
const middleware =[thunk];
const store = createStore(//... is rest operator
    reducer,composeWithDevTools(applyMiddleware(...middleware))
)
export default store;
//we can sync our local project with redux dev tool extension using npm i redux-devtools-extension on the terminal