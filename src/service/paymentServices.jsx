import axios from "axios";
export const paymentServices = async (amount,title)=>{
    try{
        const options={
            productId: 1,
            amount: amount,
            receipt: `receipt_${Date.now()}`,
        }

        const res=await axios.post('http://localhost:5000/payment/createOrder',options);
        // console.log("response: ",res);
        //response generate ho rha hai

        
        const data=res.data;
        if(data && data.success){
            console.log("data: "+data);

        const paymentObject= new window.Razorpay({
            key:"rzp_test_pIRmD0pCH6Ut3K",
            orderId: data.id,
            amount: data.amount, // Amount from backend
            currency: data.currency,
            handler:function(response){
                console.log("ye lo response: ",response);
                const pay_id=response.razorpay_payment_id;
                console.log("payment id: ",pay_id);
                
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
                    console.log("Error verifying payment: ",err);
                    
                })
                
            },
            prefill: {
                name: "Customer Name", // Customize with user data
                email: "customer@example.com", // Use actual user email
                contact: "9999999999", // Use actual contact
              },
              theme: {
                color: "#3399cc", // Customize color
              },
        });
        paymentObject.open();
    }
    else{
        console.log("pay services m err");
        
    }
        
    } catch(error){
        console.error("Error in payment services: ",error);
        
    }
};