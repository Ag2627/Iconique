import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem('token'); 

const initialState = {
    isLoading: false,
    addressList: [],
}

export const addNewAddress = createAsyncThunk(
    'address/addNewAddress',
    async (data)=>{

        const response = await axios.post('http://localhost:5000/address/add',  data,{
            headers: {
                "Content-Type": "application/json", 
              authorization: `Bearer ${token}`  // Ensure token is sent as "Bearer <token>"
            }
          });
          console.log("Token check",token);
        
        return response.data;
    }
)
export const fetchAllAddresses = createAsyncThunk(
    'address/fetchAllAddresses',
    async (userId)=>{
        const response = await axios.get(`http://localhost:5000/address/get/${userId}`,{
            headers: {
                "Content-Type": "application/json", 
              authorization: `Bearer ${token}`  // Ensure token is sent as "Bearer <token>"
            }
          });

        
        return response.data;
    }
)
export const editAddress = createAsyncThunk(
    'address/editAddress',
    async ({userId,addressId,formData})=>{
        const response = await axios.put(`http://localhost:5000/address/edit/${userId}/${addressId}`,  formData,{
            headers: {
                "Content-Type": "application/json", 
              authorization: `Bearer ${token}`  // Ensure token is sent as "Bearer <token>"
            }
          });

        
        return response.data;
    }
)
export const deleteAddress = createAsyncThunk(
    'address/deleteAddress',
    async ({userId,addressId})=>{
        const response = await axios.delete(`http://localhost:5000/address/delete/${userId}/${addressId}`,{
            headers: {
                "Content-Type": "application/json", 
              authorization: `Bearer ${token}`  // Ensure token is sent as "Bearer <token>"
            }
          });

        
        return response.data;
    }
)

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers:[],
    extraReducers:(builder)=>{
        builder.addCase(addNewAddress.pending,(state)=>{
            state.isLoading = true;
        }).addCase(addNewAddress.fulfilled,(state,action)=>{
            state.isLoading = false;
        }).addCase(addNewAddress.rejected,(state)=>{
            state.isLoading = false;
        }).addCase(fetchAllAddresses.pending,(state)=>{
            state.isLoading = true;
        }).addCase(fetchAllAddresses.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.addressList=action.payload.data;
        }).addCase(fetchAllAddresses.rejected,(state)=>{
            state.isLoading = false;
            state.addressList=[];
        })
    }
})

export default addressSlice.reducer;