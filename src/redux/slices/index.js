import { combineReducers } from "@reduxjs/toolkit";
import slidebarReducer from './sidebarSlice';
import yatchReducer from './yatchSlice';

const rootReducer  =  combineReducers({slidebar:slidebarReducer,yatchReducer}); 
export default  rootReducer;
