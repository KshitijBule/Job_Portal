import { configureStore } from "@reduxjs/toolkit";
import { configure } from "@testing-library/dom";
import userReducer from "./Slices/UserSlice";

export default configureStore({
  reducer:{
    user:userReducer
  }
})