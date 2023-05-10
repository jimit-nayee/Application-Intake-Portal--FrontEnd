import React, { useEffect, useState } from 'react'
import Navbar from "../navbar/Navbar"
import { Outlet } from 'react-router-dom'
  ;
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { useAuth } from '../../utils/auth';



const AgentPage = () => {

  const auth = useAuth()
  let token = (Cookies.get("token"));
  const [agent, setAgent] = useState(false)
  useEffect(() => {
    auth.userMail!=null ? (auth.userRole=="ROLE_AGENT" ? setAgent(true): window.location.href="/"):window.location.href="/" 
  },[])
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