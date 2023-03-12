import { Outlet, Navigate } from "react-router-dom"
import React from "react"
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from "../features/authSlice";
import Layout from "../components/Layout";


const PrivateRoutes = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  if (token){
    localStorage.setItem('state', JSON.stringify(token));
   
  }

  const state = JSON.parse(localStorage.getItem('state'));
 


  let auth = {'token':state}

  return (
<Layout>
{auth.token ? <Outlet/> : <Navigate to={'/'} />}
</Layout>
    
   
    

  )
}

export default PrivateRoutes