import { PaymentScript } from "../../utils/PaymentScript";
import {paymentServices} from "../../service/paymentServices";
import { useEffect } from "react";

const PaymentComponent = () => {
    useEffect(()=>{
        
        //loading the razorpay script
        PaymentScript();
    },[])


const handlePayment = () =>{
    const amount=500;
    const title="test product";
    paymentServices(amount,title);
}

return(
    <div>
        <h1>payment page</h1>
        <button onClick={handlePayment}>pay now</button>
    </div>
);
}
export default PaymentComponent;