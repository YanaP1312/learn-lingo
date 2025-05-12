import { createSlice } from "@reduxjs/toolkit";
import type { User } from "firebase/auth";
import { loginUser, logoutUser, registerUser } from "./operations";

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}
const initialState: AuthState = {
  user: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
