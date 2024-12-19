import * as actionType from '../constants/productConstant'
//whenever we call dispatch reducer is automatically called
const initialState = {
    product: [],
    error: null,
};

export const fetchProductReducer = (state={ products : []},action) =>{
    //we are calling dispatch twice so to differentiate we will call switch method
    switch(action.type){
        case actionType.FETCH_PRODUCT_SUCCESS :
            return {products : action.payload }
        case actionType.FETCH_PRODUCT_FAIL :
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
export const fetchProductDetailsReducer=(state={product:{}},action)=>{
  switch(action.type){
  
    case actionType.FETCH_PRODUCT_DETAILS_REQUEST:
      return {loading:true}
    case actionType.FETCH_PRODUCT_DETAILS_SUCCESS:
      return {loading:false,product:action.payload}
    case actionType.FETCH_PRODUCT_DETAILS_FAIL:
      return {loading:false, error:action.payload}
    case actionType.FETCH_PRODUCT_DETAILS_RESET:
      return {product:{}}
    default:
      return state
  }
};