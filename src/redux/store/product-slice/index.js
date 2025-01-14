import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  razorpayOrderId: null,
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

export const createNewOrder = createAsyncThunk(
  "payment/createNewOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/payment/createOrder",
        orderData
      );
      return response.data;  // Expecting Razorpay order ID from backend
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const capturePayment = createAsyncThunk(
  "payment/capturePayment",
  async ({ paymentId, orderId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/payment/capture",
        { paymentId, orderId }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
  "payment/getAllOrdersByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/payment/list/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "payment/getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/payment/details/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.razorpayOrderId = action.payload.id;  // Assuming backend returns Razorpay order ID
        sessionStorage.setItem("currentOrderId", action.payload.id);
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.razorpayOrderId = null;
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
