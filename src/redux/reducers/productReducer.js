import * as actionType from '../constants/productConstant'
//whenever we call dispatch reducer is automatically called
export const getProductsReducer = (state={ products : []},action) =>{
    //we are calling dispatch twice so to differentiate we will call switch method
    switch(action.type){
        case actionType.GET_PRODUCTS_SUCCESS :
            return {products : action.payload }
        case actionType.Get_PRODUCTS_FAIL :
            return {error :action.payload}
        default:
            return state
    }
};