import {createSlice}  from '@reduxjs/toolkit'

const sidebarSlice = createSlice({
    name:'sidebar',
    initialState:{
        sidebarShow: true,
        sidebarUnfoldable: true,
    },
    reducers:{
        setsidebar: (state, { payload }) => {
            state.sidebarShow = payload.sidebarShow
        },
        setsidebarUnfoldable: (state, { payload }) => {
            state.sidebarUnfoldable = payload.sidebarUnfoldable
        }  
    }
})
export const { setsidebar ,setsidebarUnfoldable } = sidebarSlice.actions
export default sidebarSlice.reducer