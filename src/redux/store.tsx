import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { teachersReducer } from "./teachers/slice";
import { favoritesReducer } from "./favorites/slice";
import { themeReducer } from "./theme/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teachers: teachersReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
