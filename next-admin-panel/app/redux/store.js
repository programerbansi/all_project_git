import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import dataSlice from "./slices/dataSlice";

const combinedReducer = combineReducers({dataSlice})
export const makeStore = () =>
   configureStore({
      reducer:combinedReducer,
      middleware: [thunk],
      devTools:true
})                          

export  const wrapper = createWrapper(makeStore,{debug:true})