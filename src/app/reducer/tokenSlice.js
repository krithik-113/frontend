import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name:"token",
    initialState: {
    token: "",
  },
  reducers: {
    saveLoggedInUser: (state,action) => {
      state.token = action.payload
      },
  }
});

export const {saveLoggedInUser} = tokenSlice.actions;

export default tokenSlice.reducer