import React from 'react'
import { BrowserRouter , Routes , Route , Navigate } from 'react-router-dom'
import {Signup, Register, Dashboard, Otp, Team} from '../components'
import PrivateRoutes from './PrivateRoutes'
import OtpRoutes from './otpRoutes'
import Layout from '../components/Layout'
const routes = () => {
 


  let auth = {'token':true}
  return (
    <>
    <BrowserRouter>
  
    <Routes>

   

 
        <Route element ={<PrivateRoutes/>}>
        <Route path='/dashboard' element={<Dashboard/>}/> 
        <Route path='/team' element={<Team/>}/> 
        </Route>
    
        <Route element={<Signup/>} path='/' />
        <Route element={<Register/>} path='/Register' />
        
        <Route element={<OtpRoutes/>} >
          <Route element={<Otp/>} path='/otp' />
        </Route>
       
    </Routes>
   
    </BrowserRouter>
    
    </>
  )
}

export default routes