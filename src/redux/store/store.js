//is store ko hum web ko redux se connect karenge
import { createStore , combineReducers, applyMiddleware} from "redux";
import { thunk } from "redux-thunk";
//thunk is a middleware when we call our api thunk is used
import { composeWithDevTools } from "redux-devtools-extension";
import { fetchProductDetailsReducer } from "./reducers/productReducer";
import {cartReducer} from './reducers/cartReducer'
import { fetchProducts } from "./actions/productAction";
import AdminProductsSlice from './seller/products-slice/index'
//we will pass two argumnets to the create store reducer(action item) and middleware
const reducer = combineReducers({
    fetchProducts : fetchProductReducer,
    fetchProductDetails : fetchProductDetailsReducer,
    cart:cartReducer,
    adminProducts:AdminProductsSlice,
    
});

const middleware =[thunk];
const store = createStore(//... is rest operator
    reducer,composeWithDevTools(applyMiddleware(...middleware))
)
export default store;
//we can sync our local project with redux dev tool extension using npm i redux-devtools-extension on the terminal