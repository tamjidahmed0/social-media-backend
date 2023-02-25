import { Outlet, Navigate } from "react-router-dom"
import React, { useState } from "react"

const PrivateRoutes = () => {

  let auth = {'token':false}

  return (
    auth.token ? <Outlet/> : <Navigate to={'/'} />

  )
}

export default PrivateRoutes