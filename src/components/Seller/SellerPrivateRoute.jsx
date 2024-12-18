import { toast } from "@/hooks/use-toast";
import React from "react";
import { Navigate } from "react-router-dom";

const SellerPrivateRoute = ({ children }) => {
  const isSellerAuthenticated = localStorage.getItem("token");
  const isSeller=localStorage.getItem("role")==="seller";
  if(!isSeller || !isSellerAuthenticated){
    toast({
        title: "Access Denied",
      description: "Please log in to access the seller dashboard.",
      variant: "destructive",
    })
  }
  return isSellerAuthenticated && isSeller ? children : <Navigate to="/" />;
};

export default SellerPrivateRoute;
