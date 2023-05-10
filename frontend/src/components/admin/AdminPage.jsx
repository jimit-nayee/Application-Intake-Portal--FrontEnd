import React, { useEffect, useState } from 'react'
import Navbar from "../navbar/Navbar"
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../utils/auth'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'



const AdminPage = () => {
  const auth=useAuth();
  const [admin,setAdmin]=useState(false)
  const navigate=useNavigate()
  // alert(Cookies.get("token"))
useEffect(()=>{
  auth.userMail!=null ? (auth.userRole=="ROLE_ADMIN" ? setAdmin(true): window.location.href="/"):window.location.href="/" 
})
  const navigation = [
    { name: 'Customers', href: 'list', current: true },
    { name: 'Add', href: 'add', current: false },
    {name:"Employees",href:"emplist",current:false},
    {name:"Review",href:"reviewlist",current:false}
 
  ]
  return (
   
   admin ?   <>
    <Navbar navigation={navigation} />
      <Outlet/>
     </>:""
   

  
    
  )
}

export default AdminPage