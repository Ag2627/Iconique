import * as actionType from '../constants/productConstant'
//whenever we call dispatch reducer is automatically called
const initialState = {
    product: [],
    error: null,
};

export const getProductReducer = (state={ products : []},action) =>{
    //we are calling dispatch twice so to differentiate we will call switch method
    switch(action.type){
        case actionType.GET_PRODUCTS_SUCCESS :
            return {products : action.payload }
        case actionType.Get_PRODUCTS_FAIL :
            return {error :action.payload}
            case actionType.FETCH_PRODUCT_BY_ID:
                return { ...state, product: action.payload, error: null };
              case actionType.ADD_PRODUCT:
                return { ...state, product: action.payload, error: null };
              case actionType.UPDATE_PRODUCT:
                return { ...state, product: action.payload, error: null };
              case actionType.PRODUCT_ERROR:
                return { ...state, error: action.payload };
        default:
            return state
    }
};