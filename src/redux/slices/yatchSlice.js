import {createSlice}  from '@reduxjs/toolkit'

const yatchSlice = createSlice({
    name:'yatchReducer',
    initialState:{
        selectedYatch: null
    },
    reducers:{
        setSelectedYatchToEdit: (state, { payload }) => {
            state.selectedYatch = payload;
        }  
    }
})
export const { setSelectedYatchToEdit } = yatchSlice.actions
export default yatchSlice.reducer