import { createSlice } from "@reduxjs/toolkit";

export const emailSlice = createSlice({
    name: 'email',
    initialState: {
        email : ''
    },
    reducers: {
        emailUpdate: (state, action) => {
            state.email = action.payload
        }
    }
})

export const { emailUpdate } = emailSlice.actions;
export default emailSlice.reducer;