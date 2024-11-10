import axios from "axios";
import * as actionTypes from '../constants/productConstant'
const URL ='http://localhost:5000'
export const fetchProducts = () => async (dispatch) =>{
    try{ 
        //api ko call kiya usse pura response object aaya aur use data wala field fetch kr liya
        const { data } = await axios.get(`${URL}/products`);
        
        dispatch({type :actionTypes.GET_PRODUCTS_SUCCESS,payload : data });
        //dispatch function calls reducer internally

    }
    catch(error){
       dispatch({type :actionTypes.Get_PRODUCTS_FAIL,payload : error.response})
    }
}
//backend se response payload aayega
//this is response object
