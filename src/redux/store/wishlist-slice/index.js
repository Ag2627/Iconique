import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    wishlistItems:[],
    isLoading:false,
}

export const addToWishList=createAsyncThunk('wishlist/addToWishList',async({userId,productId})=>{
    const response=await axios.post('http://localhost:5000/wishlist/add', {
        userId,productId
    },{
            headers: {
                "Content-Type": "application/json", 
              authorization: `Bearer ${localStorage.getItem('token')}`  
            }
          });
          return response.data;
})

export const getWishList=createAsyncThunk('wishlist/getWishList',async(userId)=>{
    const response=await axios.get(`http://localhost:5000/wishlist/get/${userId}`, {
            headers: {
                "Content-Type": "application/json", 
              authorization: `Bearer ${localStorage.getItem('token')}`  
            }
          });
          return response.data;
})
export const RemoveFromWishList=createAsyncThunk('wishlist/RemoveFromWishList',async({userId,productId})=>{
    const response=await axios.delete(`http://localhost:5000/wishlist/delete/${userId}/${productId}`, {
            headers: {
                "Content-Type": "application/json", 
              authorization: `Bearer ${localStorage.getItem('token')}`  
            }
          });
          return response.data;
})
const 
wishlistSlice=createSlice({
    name:'wishlist',
    initialState,
    reducers:[],
    extraReducers:(builder)=>{
        builder.addCase(addToWishList.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addToWishList.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.wishlistItems=action.payload.data;
        })
        .addCase(addToWishList.rejected,(state)=>{
            state.isLoading=false;
            state.wishlistItems=[]
        }).addCase(getWishList.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getWishList.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.wishlistItems=action.payload.data;
        })
        .addCase(getWishList.rejected,(state)=>{
            state.isLoading=false;
            state.wishlistItems=[]
        }).addCase(RemoveFromWishList.pending,(state)=>{
            state.isLoading=true;
        }).addCase(RemoveFromWishList.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.wishlistItems=action.payload.data;
        })
        .addCase(RemoveFromWishList.rejected,(state)=>{
            state.isLoading=false;
            state.wishlistItems=[]
        })
    }
})

export default wishlistSlice.reducer;