import { createSlice } from '@reduxjs/toolkit'
const statusStore= createSlice({
    name:'status',
    initialState:{
        tightBorder:true
    },
    reducers:{
        setTightBorder:(state,action)=>{
            state.tightBorder=action.payload
        }
    }

})
export const {setTightBorder}=statusStore.actions
const reducer=statusStore.reducer
export default reducer