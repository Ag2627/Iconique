import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderList: [],
  orderDetails: null,
};

export const getAllOrdersForSeller = createAsyncThunk(
  "/orders/getAllOrdersForSeller",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/seller/orders/get`
    );

    return response.data;
  }
);

export const getOrderDetailsForSeller = createAsyncThunk(
  "/orders/getOrderDetailsForSeller",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/seller/orders/details/${id}`
    );

    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/orders/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `http://localhost:5000/seller/orders/update/${id}`,
      {
        orderStatus,
      }
    );

    return response.data;
  }
);

const sellerOrderSlice = createSlice({
  name: "sellerOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      console.log("resetOrderDetails");

      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForSeller.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForSeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForSeller.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForSeller.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForSeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForSeller.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = sellerOrderSlice.actions;

export default sellerOrderSlice.reducer;