import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "./operations";

interface AuthState {
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null;
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
