import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "./operations";
import { getFirebaseErrorMessage } from "../../helpers/firebase";

interface AuthState {
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null;
  status: "checking" | "authenticated" | "unauthenticated" | "loading";
  error: string | null;
}
const initialState: AuthState = {
  user: null,
  status: "checking",
  error: null,
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

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "unauthenticated";
      })
      .addMatcher(
        isAnyOf(registerUser.fulfilled, loginUser.fulfilled),
        (state, action) => {
          state.user = action.payload;
          state.status = "authenticated";
          state.error = null;
        }
      )
      .addMatcher(isAnyOf(registerUser.pending, loginUser.pending), (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addMatcher(
        isAnyOf(registerUser.rejected, loginUser.rejected),
        (state, action) => {
          state.status = "unauthenticated";
          const firebaseCode = (action.error as any).code || "";
          const message = getFirebaseErrorMessage(firebaseCode);

          state.error = message;
        }
      );
  },
});

export const { setUser, setAuthStatus } = authSlice.actions;
export const authReducer = authSlice.reducer;
