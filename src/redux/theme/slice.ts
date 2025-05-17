import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ThemeName } from "../../helpers/themes";
import type { RootState } from "../store";

interface ThemeState {
  current: ThemeName;
}

const initialState: ThemeState = {
  current: (localStorage.getItem("theme") as ThemeName) || "yellow",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeName>) {
      state.current = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const selectTheme = (state: RootState) => state.theme.current;

export const { setTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
