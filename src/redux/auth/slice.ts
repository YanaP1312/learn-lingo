import { createSlice } from "@reduxjs/toolkit";
import type { User } from "firebase/auth";

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
    builder.addCase;
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
