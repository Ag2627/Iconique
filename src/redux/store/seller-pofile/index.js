import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state for the seller profile
const initialState = {
  profile: [],
  isLoading: false,
  error: null,
};

// Fetch seller profile
export const fetchSellerProfile = createAsyncThunk(
  'seller/fetchSellerProfile',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/seller/get/${id}`,{
        headers: {
            "Content-Type": "application/json", 
          authorization: `Bearer ${localStorage.getItem('token')}` 
        }
      });
      //console.log("apaihan" ,response.data);
      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update seller profile
export const updateSellerProfile = createAsyncThunk(
  'seller/updateSellerProfile',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5000/seller/edit/${id}`, data,{
        headers: {
            "Content-Type": "application/json", 
          authorization: `Bearer ${localStorage.getItem('token')}` 
        }
      });
      console.log("khushboo" ,response.data);
      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete seller profile
// export const deleteProductBySellerId = createAsyncThunk(
//   "products/deleteBySellerId",
//   async (sellerId, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(`http://localhost:5000/seller/delete/${sellerId}`,{
//         headers: {
//             "Content-Type": "application/json", 
//           authorization: `Bearer ${localStorage.getItem('token')}` 
//         }
//       }); // Backend endpoint to delete products
//       console.log("response lenge ab ",response.data);
//       return response.data; // Expect success response from backend
//     } catch (error) {
//       console.error("Failed to delete products:", error);
//       return rejectWithValue(error.response?.data || "Failed to delete products.");
//     }
//   }
//);
export const deleteSellerProfile = createAsyncThunk(
  "sellerProfile/delete",
  async (sellerId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/seller/delete/${sellerId}`,{
        headers: {
            "Content-Type": "application/json", 
          authorization: `Bearer ${localStorage.getItem('token')}` 
        }
      }); // Backend endpoint to delete seller profile
      return response.data; // Expect success response from backend
    } catch (error) {
      console.error("Failed to delete seller profile:", error);
      return rejectWithValue(error.response?.data || "Failed to delete seller profile.");
    }
  }
);

// Redux slice for seller profile
const sellerSlice = createSlice({
  name: 'sellerProfile',
  initialState,
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload.data;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.profile=[]
      })
    }
});

export default sellerSlice.reducer;
