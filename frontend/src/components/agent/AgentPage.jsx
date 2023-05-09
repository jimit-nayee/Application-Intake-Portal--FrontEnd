import React, { useEffect, useState } from 'react'
import Navbar from "../navbar/Navbar"
import { Outlet } from 'react-router-dom'
  ;
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';



const AgentPage = () => {


  let token = (Cookies.get("token"));
  const [agent, setAgent] = useState(false)
  useEffect(() => {
    if (token != null) {
      token = jwtDecode(token);
      if (token.authorities == "ROLE_AGENT") {
        // alert(true)
        setAgent(true)
      }
      else {
        window.location.href = "/"
      }
    }
    else {
      window.location.href = "/"
    }
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