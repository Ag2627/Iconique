import axios from "axios";
import * as actionTypes from '../constants/productConstant'
const URL ='http://localhost:5000'
export const fetchProducts = () => async (dispatch) =>{
    try{ 
        //api ko call kiya usse pura response object aaya aur use data wala field fetch kr liya
        const { data } = await axios.get(`${URL}/seller/products`);
        
        dispatch({type :actionTypes.GET_PRODUCTS_SUCCESS,payload : data });
        //dispatch function calls reducer internally

    }
    catch(error){
       dispatch({type :actionTypes.Get_PRODUCTS_FAIL,payload : error.response})
    }
}
//backend se response payload aayega
//this is response object


// action to fetch product by id
export const fetchProductById=(id)=>async(dispatch)=>{
    try{
        const {data}=await axios.get(`/seller/products/${id}`);
        dispatch({type:actionTypes.FETCH_PRODUCT_BY_ID,payload:data});
    } catch(error){
        dispatch({type:actionTypes.PRODUCT_ERROR,payload:error.message});
    }
};

// Action to add a new product
export const addProduct = (product) => async (dispatch) => {
    try {
      const { data } = await axios.post('/seller/products', product);
      dispatch({ type:actionTypes.ADD_PRODUCT, payload: data });
    } catch (error) {
      dispatch({ type:actionTypes. PRODUCT_ERROR, payload: error.message });
    }
  };
  
  // Action to update an existing product
  export const updateProduct = (id, updatedProduct) => async (dispatch) => {
    try {
      const { data } = await axios.put(`/seller/products/${id}`, updatedProduct);
      dispatch({ type: actionTypes.UPDATE_PRODUCT, payload: data });
    } catch (error) {
      dispatch({ type:actionTypes. PRODUCT_ERROR, payload: error.message });
    }
  };