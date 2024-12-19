import axios from "axios";
import * as actionTypes from '../constants/productConstant.js'
const URL ='http://localhost:5000'
export const fetchProducts = () => async (dispatch) =>{
    try{ 
        //api ko call kiya usse pura response object aaya aur use data wala field fetch kr liya
        const { data } = await axios.get(`${URL}/products`);
        
        dispatch({type :actionTypes.FETCH_PRODUCT_SUCCESS,payload : data });
        //dispatch function calls reducer internally

    }
    catch(error){
       dispatch({type :actionTypes.FETCH_PRODUCT_FAIL,payload : error.response})
    }
}
//backend se response payload aayega
//this is response object


// action to fetch product by id
export const fetchProductDetails=(id)=>async(dispatch)=>{
    try{
        dispatch({type:actionTypes.FETCH_PRODUCT_DETAILS_REQUEST});

        const {data}=await axios.get(`${URL}/product/${id}`);
        dispatch({type:actionTypes.FETCH_PRODUCT_DETAILS_SUCCESS,payload:data});
    } catch(error){
        dispatch({type:actionTypes.FETCH_PRODUCT_DETAILS_FAIL,payload:error.message});
    }
};

// Action to add a new product
export const addProduct = (product) => async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/seller/products`, product);
      dispatch({ type:actionTypes.ADD_PRODUCT, payload: data });
    } catch (error) {
      dispatch({ type:actionTypes. PRODUCT_ERROR, payload: error.message });
    }
  };
  
  // Action to update an existing product
  export const updateProduct = (id, updatedProduct) => async (dispatch) => {
    try {
      const { data } = await axios.put(`${URL}/seller/products/${id}`, updatedProduct);
      dispatch({ type: actionTypes.UPDATE_PRODUCT, payload: data });
    } catch (error) {
      dispatch({ type:actionTypes. PRODUCT_ERROR, payload: error.message });
    }
  };