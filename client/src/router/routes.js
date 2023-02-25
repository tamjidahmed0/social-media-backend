import React from 'react'
import { BrowserRouter , Routes , Route , Navigate } from 'react-router-dom'
import {Signup, Register, Dashboard} from '../components'
import PrivateRoutes from './PrivateRoutes'

const routes = () => {
  let auth = {'token':true}
  return (
    <>
    <BrowserRouter>
    <Routes>
        {/* <Route path='/' element={<Signup />}/>
        <Route path='/signin' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/> */}
        <Route element ={<PrivateRoutes/>}>
        <Route path='/dashboard' element={<Dashboard/>}/> 
        </Route>
     
        <Route element={<Signup/>} path='/' />
        <Route element={<Register/>} path='/Register' />
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default routes