import axios from "axios"
import * as actionType from '../constants/cartConstant'
const URL ='http://localhost:5000'
export const addToCart =(_id,quantity) =>async(dispatch) =>{
    try{
        const {data} = await axios.get(`${URL}/product/${_id}`);

        dispatch({type :actionType.ADD_TO_CART,payload:{...data,quantity}});
    }
    catch(error){
        dispatch({type :actionType.ADD_TO_CART_ERROR,payload:error.message});
    }
}
export const removeFromCart = (_id) => (dispatch)=>{
    //we haven't used try and catch here as there is no api call so there is no chance of error
    dispatch({type :actionType.REMOVE_FROM_CART,payload :_id});

}