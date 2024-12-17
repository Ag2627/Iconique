import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const token = localStorage.getItem('token');  // Get the token


const initialState={
    isLoading:false,
    productList:[],
    error:null,
}

export const addNewProduct=createAsyncThunk('/products/addnewproduct',async (formData)=>{
    
    const result=await axios.post("http://localhost:5000/seller/products/add",formData,
        {
            headers: {
                "Content-Type": "application/json", 
              authorization: `Bearer ${token}`  // Ensure token is sent as "Bearer <token>"
            },
            withCredentials: true,
          }
    );
    return result?.data;
});

export const fetchProducts=createAsyncThunk('/products/fetchProducts',async ()=>{
    const result=await axios.get("http://localhost:5000/seller/products/get");
    return result?.data;
});

export const editProduct=createAsyncThunk('/products/editproduct',async ({id,formData})=>{
    const result=await axios.put(`http://localhost:5000/seller/products/edit/${id}`,formData,{
        headers: {
            "Content-Type": "application/json", 
          authorization: `Bearer ${token}`  // Ensure token is sent as "Bearer <token>"
        }
      });
    return result?.data;
});

export const deleteProduct=createAsyncThunk('/products/deleteproduct',async (id)=>{
    const result=await axios.delete(`http://localhost:5000/seller/products/delete/${id}`);
    return result?.data;
});
const AdminProductsSlice= createSlice({
    name: 'adminProducts',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state)=>{
            state.isLoading=true
        }).addCase(fetchProducts.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.isLoading=false
            state.productList=action.payload.data
        }).addCase(fetchProducts.rejected,(state,action)=>{
            console.log(action.payload)
            state.isLoading=false
            state.productList=[]
        })
    }
})

export default AdminProductsSlice.reducer;