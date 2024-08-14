import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./reducer/tokenSlice";
import emailSlice from "./reducer/emailSlice";

export default configureStore({
  reducer: {
    token: tokenSlice,
    email: emailSlice,
  },
});

