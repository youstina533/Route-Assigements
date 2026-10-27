import {Navigate} from "react-router-dom";
import {type ReactNode} from "react";

export default function AfterLoggingProtectedRoute({children} : {children: ReactNode }) {
    if(!localStorage.getItem("userToken")){
       return children
    } 
    else{
       return <Navigate to="/home"/>
  }
}