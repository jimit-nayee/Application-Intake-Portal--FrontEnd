import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import {  createContext, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext=createContext(null);

export const AuthProvider=({children})=>{
  const [userMail,setUserMail]=useState(null);
  const [userRole,setUserRole]=useState(null)
  const login=()=>{
    const user =jwtDecode(Cookies.get('token'));
    setUserMail(user.sub);
    setUserRole(user.authorities);

  }
  const logout=()=>{
    setUserMail(null)
    setUserRole(null)
    Cookies.remove("token")
    window.location.href="/"
    
  }

  return (<AuthContext.Provider value={{userRole,userMail,login,logout}}>
    {children}
  </AuthContext.Provider>
  )
}

export const useAuth=()=>{
  return useContext(AuthContext);
}