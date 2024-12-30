import React from "react";
import { useState,useEffect } from "react";
import {loadScript} from './loadScript';


export const PaymentScript=() =>{
    useEffect(()=>{(
        async()=>{
            try{
                const isLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
                if(isLoaded){
                    console.log("payment gateway script loaded successfully");  
                }
            } catch (error){
                console.log("Failed to load payment script: ",error);
                
            }
        }
    )
        
    },[])
    
}