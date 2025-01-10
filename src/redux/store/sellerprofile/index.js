import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem('token'); 

const initialState = {
    isLoading: false,
    SellerList: [],
}

export const fetchSeller= createAsyncThunk(
    'seller/fetchSeller',
    async(id)=>{
        const response = await axios.get(`http://localhost:5000/seller/get/${id}`,{
            headers: {
                "Content-Type": "application/json", 
              authorization: `Bearer ${token}` 
            }
          });

        
        return response.data;
    }
)

export const editSeller = createAsyncThunk(
    'seller/editSeller',
    async ({id,formData})=>{
        const response = await axios.put(`http://localhost:5000/seller/edit/${id}`,  formData,{
            headers: {
                "Content-Type": "application/json", 
              authorization: `Bearer ${token}` 
            }
          });

        
        return response.data;
    }
)

export const deleteSeller = createAsyncThunk(
    'seller/deleteSeller',
    async (id)=>{
        const response = await axios.delete(`http://localhost:5000/seller/delete/${id}`,{
            headers: {
                "Content-Type": "application/json", 
              authorization: `Bearer ${token}` 
            }
          });

        
        return response.data;
    }
)
const sellerSlice = createSlice({
    name:'sellerProfile',
    initialState,
    reducers:[],
    extraReducers:(builder)=>{
        builder.addCase(fetchSeller.pending,(state)=>{
            state.isLoading = true;
        }).addCase(fetchSeller.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.SellerList = action.payload.data;
        }).addCase(fetchSeller.rejected,(state)=>{
            state.isLoading = false;
            state.SellerList=[];
        })
    }})
    export default sellerSlice.reducer; 