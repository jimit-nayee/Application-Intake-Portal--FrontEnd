import React, { useEffect, useState } from 'react'
import Navbar from "../navbar/Navbar"
import { Outlet } from 'react-router-dom'
import api from '../../services/mainService';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';



const ReviewerPage = () => {

   
  let token=(Cookies.get("token"));
  const [reviewer,setReviewer]=useState(false)

  if(token!=null)
  {
    token=jwtDecode(token);
    if(token.authorities=="ROLE_REVIEWER")
    {
      setReviewer(true)
    }
    else{
      window.location.href="/"
    }
  }
  else{
    window.location.href="/"
  }
    const navigation = [
        { name: 'Show List', href: 'list', current: true },
        { name: 'Add', href: 'add', current: false },
      ]
  return (
    reviewer ?<>
    
   <Navbar navigation={navigation}/>
   
     <Outlet/>
    </>: window.location.href='/'
  )
}

export default ReviewerPage