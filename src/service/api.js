import axios from "axios";
const URL="http://localhost:5000"

let token = localStorage.getItem('token');
export const authenticateSignup=async (data)=>{
    try{
        return await axios.post(`${URL}/signup`,data)
    }
    catch(error){
        console.log("Error while calling signup api",error);
    }
}
export const authenticateSellerSignup=async (data)=>{
    try{        
        return await axios.post(`${URL}/seller-signup`,data)
    }
    
    catch(error){
        console.log("Error while calling signup api",error);
    }
}
export const authenticateLogin=async (data)=>{
    try{
        return await axios.post(`${URL}/login`,data)
    }
    catch(error){
        console.log("Error while calling login api",error);
        return error.response;
    }
}
export const authenticateSellerLogin=async (data)=>{
    try{
        return await axios.post(`${URL}/seller-login`,data)
    }
    catch(error){
        console.log("Error while calling login api",error);
        return error.response;
    }
}

export const authenticateGoogleLogin = async (googleUser) => {
    return axios.post(`${URL}/google-login`,{
      email: googleUser.email,
      name: googleUser.name,
    });
};
export const authenticateSellerGoogleLogin = async (googleUser) => {
    return axios.post(`${URL}/google-sellerlogin`,{
      email: googleUser.email,
      name: googleUser.name,
    });
};

// export const payUsingPaytm=async(data)=>{
//     try{
//         let response=await axios.post(`${URL}/payment`,data);
//     } catch(error){
//         console.log('error while calling payment api'.error)
//     }
// }
//redux is the database of the frontend

export const fetchProfile = async (role, id) => {
    const { data } = await axios.get(`${URL}/${role}/profile/${id}`,{
        headers: {
            "Content-Type": "application/json", 
          authorization: `Bearer ${token}`  // Ensure token is sent as "Bearer <token>"
        },
        withCredentials: true,
      });
    return data;
};

export const updateProfile = async (role, id, updatedData) => {
    const { data } = await axios.put(`${URL}/${role}/profile/${id}`, updatedData,{
        headers: {
            "Content-Type": "application/json", 
          authorization: `Bearer ${token}`  
        },
        withCredentials: true,
      });
    return data;
};

// export const fetchProductById = (id) => axios.get(`/seller/products/${id}`);
// export const addProduct = (product) => axios.post('/seller/products', product);
// export const updateProduct = (id, updatedProduct) => axios.put(`/seller/products/${id}`, updatedProduct);