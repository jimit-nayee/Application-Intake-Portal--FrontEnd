import React, { useEffect } from 'react'
import Navbar from "../navbar/Navbar"
import { Outlet } from 'react-router-dom'
import api from '../../services/mainService';



const AgentPage = () => {

    const navigation = [
        { name: 'Show List', href: 'list', current: true },
        { name: 'Add', href: 'add', current: false },
      ]
  return (
    <>
    
   <Navbar navigation={navigation}/>
   
     <Outlet/>
    </>
  )
}

export default AgentPage