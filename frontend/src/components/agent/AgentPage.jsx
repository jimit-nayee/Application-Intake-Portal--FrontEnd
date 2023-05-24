import React, { useEffect, useState } from 'react'
import Navbar from "../navbar/Navbar"
import { Outlet } from 'react-router-dom'
  ;
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { useAuth } from '../../utils/auth';



const AgentPage = () => {
  if((Cookies.get('token'))==null)
  window.location.href="/"
  const auth = useAuth()
  const [agent,setAgent]=useState(false)
  let user={};
  let userMail=""
  let userRole=""
 try{
    user = jwtDecode(Cookies.get('token'));
    userMail = user.sub;
    userRole = user.authorities.substring(5).charAt(0).toUpperCase()+user.authorities.substring(6).toLowerCase();
 }catch{
  window.location.href="/"
 }
  useEffect(() => {
    userMail != null ? (userRole == "Agent" ? setAgent(true): window.location.href = "/") : window.location.href = "/"
  }, [])

  const navigation = [
    { name: 'Show List', href: 'list', current: true },
    { name: 'Add', href: 'add', current: false },
  ]
  return (
    agent ? <>
      <Navbar navigation={navigation} />
      <Outlet />
    </> : ""
  )
}

export default AgentPage