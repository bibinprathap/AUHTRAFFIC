import { configureStore } from "@reduxjs/toolkit";
import {   useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger'
import rootReducer from './slices'
const middlewares = [ logger]

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
})


export const useAppDispatch = () => useDispatch()
export const useAppSelector  = useSelector
export { store }

 
