import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/authSlice'
import welcomeSlice from '../features/welcomeSlice'
import otpRedirect from '../features/otpRedirect'
import OtpToken from '../features/OtpToken'

export default configureStore({
  reducer: {
    auth: authSlice,
    welcome:welcomeSlice,
    otp:otpRedirect,
    otptoken:OtpToken
  },
})