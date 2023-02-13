import React from 'react'
import { BrowserRouter , Routes , Route  } from 'react-router-dom'
import {Signup, Register, Dashboard} from '../components'

const routes = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Signup />}/>
        <Route path='/signin' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
       
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default routes