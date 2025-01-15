import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    statsList: [],
}

export const fetchStats= createAsyncThunk(
    'seller/fetchStats',
    async(id)=>{
        const response = await axios.get(`http://localhost:5000/overview/get/${id}`,{
            headers: {
                "Content-Type": "application/json", 
              authorization: `Bearer ${localStorage.getItem('token')}` 
            }
          });

        
        return response.data;
    }
)

const statsSlice = createSlice({
    name:'stats',
    initialState,
    reducers:[],
    extraReducers:(builder)=>{
        builder.addCase(fetchStats.pending,(state)=>{
            state.isLoading = true;
        }).addCase(fetchStats.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.statsList = action.payload.data;
        }).addCase(fetchStats.rejected,(state)=>{
            state.isLoading = false;
            state.statsList=[];
        })
    }})
    
export default statsSlice.reducer; 

