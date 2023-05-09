import Cookies from "js-cookie";
import {  createContext, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext=createContext(null);

export const AuthProvider=({children})=>{
  const [user,setUser]=useState(null);
  const [xsrfToken,setXsrfToken]=useState(null)
  const navigate=useNavigate();
  const login=(user,xsrf)=>{
    setUser(user)
    setXsrfToken(xsrf)
    
    // alert("user is set");
  }
  const logout=()=>{
    setUser(null)
    Cookies.remove("token")
    setXsrfToken(null)
    window.location.href="/"
    // alert("getting logged out")
    
  }
  return (<AuthContext.Provider value={{user,login,logout}}>
    {children}
  </AuthContext.Provider>
  )
}

export const useAuth=()=>{
  return useContext(AuthContext);
}