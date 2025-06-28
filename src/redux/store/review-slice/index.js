import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    reviewList: [],
}

export const addReview = createAsyncThunk(
    'order/addReview',
     async (reviewData, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/review/add", reviewData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
)

export const getReviews = createAsyncThunk(
    '/order/getReviews',
    async (id)=>{

        const response = await axios.get(`http://localhost:5000/review/${id}`);
    
        
        return response.data;
    }
)
const reviewSlice = createSlice({

    name: 'reviewSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getReviews.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getReviews.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.reviewList=action.payload.data;
        }).addCase(getReviews.rejected,(state)=>{
            state.isLoading=false;
            state.reviewList=[];
        })
    }
});

export default reviewSlice.reducer;