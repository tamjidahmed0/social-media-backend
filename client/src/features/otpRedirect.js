import { createSlice } from "@reduxjs/toolkit"

const otp = createSlice({
    name: 'otp',
    initialState: {token:false},
    reducers:{
        setOtp:(state, action) =>{
            state.token = action.payload;
        }
        
    }
})

export const {setOtp} = otp.actions
export default otp.reducer