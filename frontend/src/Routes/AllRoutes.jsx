import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Components/Dashboard/Dashboard'
import Login from '../Components/Login/Login'
import Maps from '../Components/Maps/Maps'
import Signup from '../Components/SignUp/Signup'

function AllRoutes() {
  return (
 <Routes>
    <Route path='/'  element={<Login />}/>

    <Route path='/login'  element={<Login />}/>
    <Route path='/signup'  element={<Signup />}/>
    <Route path='/map'  element={<Maps />}/>
    <Route path='/dashboard'  element={<Dashboard />}/>
 </Routes>
  )
}

export default AllRoutes