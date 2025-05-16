import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "./operations";

interface AuthState {
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null;
  status: "checking" | "authenticated" | "unauthenticated";
}
const initialState: AuthState = {
  user: null,
  status: "checking",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setAuthStatus(state, action) {
      state.status = action.payload;
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

export const { setUser, setAuthStatus } = authSlice.actions;
export const authReducer = authSlice.reducer;
