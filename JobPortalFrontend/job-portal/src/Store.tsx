import { configureStore } from "@reduxjs/toolkit";
import { configure } from "@testing-library/dom";
import userReducer from "./Slices/UserSlice";
import profileReducer from "./Slices/ProfileSlice";

export default configureStore({
  reducer:{
    user:userReducer,
    profile:profileReducer
  }
})