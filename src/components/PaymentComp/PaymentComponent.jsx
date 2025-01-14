// import { PaymentScript } from "../../utils/PaymentScript";
// import { useLoadScript } from "@/utils/loadScript.js";
import { usePaymentScript } from "@/utils/PaymentScript.js";
import {paymentServices} from "../../service/paymentServices.jsx";
import { useEffect } from "react";

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 50px)', // Leaves space for the footer
    padding: '20px',
    backgroundColor: '#f9f9f9',
};

const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
};




const PaymentComponent = () => {
    console.log("script loading...");
    usePaymentScript();
    console.log("loaded");
    


const handlePayment = () =>{
    const amount=500;
    const title="test product";
    paymentServices(amount,title);
}

return(
    <div style={containerStyle}>
        <h1>payment page</h1>

        <div>
        <button style={buttonStyle} onClick={handlePayment}>pay now</button>
        </div>
        
    </div>
);
}
export default PaymentComponent;