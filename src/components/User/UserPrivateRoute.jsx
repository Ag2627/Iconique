import { toast } from "@/hooks/use-toast";
import React from "react";
import { Navigate } from "react-router-dom";

const UserPrivateRoute = ({ children }) => {
  const isUserAuthenticated = localStorage.getItem("token");
  const isUser=localStorage.getItem("role")==="user";
  if(!isUser || !isUserAuthenticated){
    toast({
        title: "Access Denied",
      description: "Please log in to access the user dashboard.",
      variant: "destructive",
    })
  }
  return isUserAuthenticated && isUser ? children : <Navigate to="/" />;
};

export default UserPrivateRoute;
