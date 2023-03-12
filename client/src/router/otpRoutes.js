import { Outlet, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router'
import { useSelector } from "react-redux";




const OtpRoutes = () => {

const token = useSelector((state)=> state.otp.token)
let auth = {'token':token}
console.log(token)
  return (
    <>
    {auth.token ? <Outlet/> : <Navigate to= {'/'}  />}
    
    </>
  )
}

export default OtpRoutes