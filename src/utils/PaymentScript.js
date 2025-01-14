import React from "react";
import { useState,useEffect } from "react";
// import {useLoadScript} from './loadScript';


// export const usePaymentScript=() =>{
//     useEffect(()=>{(
//         async()=>{
//             try{
//                 const isLoaded = await useLoadScript('https://checkout.razorpay.com/v1/checkout.js');
//                 if(isLoaded){
//                     console.log("payment gateway script loaded successfully");  
//                 }
//             } catch (error){
//                 console.log("Failed to load payment script: ",error);
                
//             }
//         }
//     )
        
//     },[])
    
// }

// Custom hook example for PaymentScript
export const usePaymentScript = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        // 
        
        script.async = true;
        document.body.appendChild(script);
        console.log("loaded script");

        return () => {
            document.body.removeChild(script);
        };
    }, []);
};
