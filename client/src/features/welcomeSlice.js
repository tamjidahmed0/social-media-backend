import { createSlice } from "@reduxjs/toolkit"

const welcomeSlice = createSlice({
    name: 'welcome',
    initialState: {msg:'Here you can see business insights'},
    reducers:{
        setMsg:(state, action) =>{
            state.msg = action.payload;
        }
        
    }
})

export const {setMsg} = welcomeSlice.actions
export default welcomeSlice.reducer