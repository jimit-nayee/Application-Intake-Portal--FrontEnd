import React, { useEffect, useState } from 'react'
import Navbar from "../navbar/Navbar"
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../utils/auth'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'



const AdminPage = () => {

  const [admin, setAdmin] = useState(false)
  if((Cookies.get('token'))==null)
     window.location.href="/"
     let user = {};
     let userMail = ""
     let userRole = ""
     try {
       user = jwtDecode(Cookies.get('token'));
       userMail = user.sub;
       userRole = user.authorities.substring(5).charAt(0).toUpperCase() + user.authorities.substring(6).toLowerCase();
     } catch {
       window.location.href = "/"
     }
  useEffect(() => {
    userMail != null ? (userRole == "Admin" ? setAdmin(true) : window.location.href = "/") : window.location.href = "/"
  }, [])
  const navigation = [
    { name: 'Customers', href: 'list', current: true },
    { name: 'Add', href: 'add', current: false },
    { name: "Employees", href: "emplist", current: false },
    { name: "Review", href: "reviewlist", current: false }

  ]
  return (

    admin ? <>
      <Navbar navigation={navigation} />
      <Outlet />
    </> : ""




  )
}

export default AdminPage