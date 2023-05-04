import React from 'react'
import Navbar from "../navbar/Navbar"
import { Outlet } from 'react-router-dom'



const AdminPage = () => {
  const navigation = [
    { name: 'Customers', href: 'list', current: true },
    { name: 'Add', href: 'add', current: false },
    {name:"Employees",href:"emplist",current:false},
    {name:"Review",href:"reviewlist",current:false}
 
  ]
  return (
    <>
    
   <Navbar navigation={navigation} />
   
     <Outlet/>
    </>
  )
}

export default AdminPage