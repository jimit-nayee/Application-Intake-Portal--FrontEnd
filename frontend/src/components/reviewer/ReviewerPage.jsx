import React, { useEffect, useState } from 'react'
import Navbar from "../navbar/Navbar"
import { Outlet } from 'react-router-dom'
import api from '../../services/mainService';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { useAuth } from '../../utils/auth';



const ReviewerPage = () => {
  if((Cookies.get('token'))==null)
  window.location.href="/"
  const auth = useAuth()


  const [reviewer, setReviewer] = useState(false)
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
    // alert(userRole)
    userMail != null ? (userRole == "Reviewer" ? setReviewer(true) : window.location.href = "/") : window.location.href = "/"

  }, [])
  const navigation = [
    { name: 'Show List', href: 'list', current: true },
    { name: 'Add', href: 'add', current: false },
  ]
  return (
    reviewer ? <>

      <Navbar navigation={navigation} />

      <Outlet />
    </> : ""
  )
}

export default ReviewerPage