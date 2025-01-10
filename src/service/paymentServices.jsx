import axios from "axios";
export const paymentServices = async (amount,title)=>{
    try{
        const options={
            productId: 1,
            amount: amount,
        }

        const res=await axios.post('http://localhost:5000/payment/createOrder',options);
        // console.log("response: ",res);
        //response generate ho rha hai

        
        const data=res.data;
        if(data){
            console.log("data: "+data);

        
        
        console.log("ye lo tyoe window ka;  ",typeof window.Razorpay);
        const paymentObject= new window.Razorpay({
            key:"rzp_test_pIRmD0pCH6Ut3K",
            orderId: data.id,
            ...data,
            handler:function(response){
                console.log(response);
                const optn={
                    orderId:response.razorpay_order_id,
                    paymentId:response.razorpay_payment_id,
                    sign:response.razorpay_signature,
                }
                axios.post('https://localhost:5000/verifyPayment',optn).then((res)=>{
                    console.log(res.data);
                    if(res.data.status==="success"){
                        alert("payment successful");
                    }else{
                        alert("payment failed");
                    }
                    
                }).catch((err)=>{
                    console.log(err);
                    
                })
                
            }
        })
        paymentObject.open();
    }
    else{
        console.log("pay services m err");
        
    }
        
    } catch(error){
        console.error("Error in payment services: ",error);
        
    }
};