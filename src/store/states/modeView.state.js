import { createSlice } from "@reduxjs/toolkit";

const modeViewSlice = createSlice({
    name:'modeView',
    initialState:true,
    reducers:{
        setModeViewG:(state,action)=>action.payload
    }
})

export const {setModeViewG} = modeViewSlice.actions

export default modeViewSlice.reducer