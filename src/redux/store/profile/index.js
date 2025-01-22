import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    UserList: [],
}

export const fetchUser= createAsyncThunk(
    'user/fetchUser',
    async(id)=>{
        const response = await axios.get(`http://localhost:5000/user/get/${id}`,{
            headers: {
                "Content-Type": "application/json", 
              authorization: `Bearer ${localStorage.getItem('token')}` 
            }
          });

        
        return response.data;
    }
)

export const editUser = createAsyncThunk(
    'user/editUser',
    async ({id,formData})=>{
        const response = await axios.put(`http://localhost:5000/user/edit/${id}`,  formData,{
            headers: {
                "Content-Type": "application/json", 
              authorization: `Bearer ${localStorage.getItem('token')}` 
            }
          });

        
        return response.data;
    }
)

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (id)=>{
        const response = await axios.delete(`http://localhost:5000/user/delete/${id}`,{
            headers: {
                "Content-Type": "application/json", 
              authorization: `Bearer ${localStorage.getItem('token')}` 
            }
          });

        
        return response.data;
    }
)
// Fetch Seller Profile
export const fetchSellerProfile = createAsyncThunk(
    'seller/fetchSellerProfile',
    async (id) => {
      const response = await axios.get(`http://localhost:5000/seller/get/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data; // Assuming response.data contains the seller profile
    }
  );
  
  // Update Seller Profile
  export const updateSellerProfile = createAsyncThunk(
    'seller/updateSellerProfile',
    async ({ id, formData }) => {
      const response = await axios.put(`http://localhost:5000/seller/edit/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data; // Assuming response.data contains the updated profile
    }
  );
const userSlice = createSlice({
    name:'userProfile',
    initialState,
    reducers:[],
    extraReducers:(builder)=>{
        builder.addCase(fetchUser.pending,(state)=>{
            state.isLoading = true;
        }).addCase(fetchUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.UserList = action.payload.data;
        }).addCase(fetchUser.rejected,(state)=>{
            state.isLoading = false;
            state.UserList=[];
        })
        .addCase(fetchSellerProfile.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
        .addCase(fetchSellerProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.UserList = action.payload.data;
          })
        .addCase(fetchSellerProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })
        
        
      
    }})
    
export default userSlice.reducer; 

