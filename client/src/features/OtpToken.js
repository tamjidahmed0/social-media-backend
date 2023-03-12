import { createSlice } from "@reduxjs/toolkit"

const OtpToken = createSlice({
    name: 'otptoken',
    initialState: {token:''},
    reducers:{
        setOtp:(state, action) =>{
            state.token = action.payload;
        }
        
    }
})

export const {setOtpToken} = OtpToken.actions
export default OtpToken.reducer