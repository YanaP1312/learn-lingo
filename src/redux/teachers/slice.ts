import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchTeachers } from "./operations";
import type { Teacher, TeachersState } from "../../helpers/App.types";

const initialState: TeachersState = {
  teachers: [],
  status: "idle",
  filters: {
    languages: null,
    levels: null,
    price_per_hour: null,
  },
  visibleCount: 4,
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    setLanguageFilter(state, action: PayloadAction<string | null>) {
      state.filters.languages = action.payload;
    },
    setLevelFilter(state, action: PayloadAction<string | null>) {
      state.filters.levels = action.payload;
    },
    setPriceFilter(state, action: PayloadAction<number | null>) {
      state.filters.price_per_hour = action.payload;
    },
    loadMoreTeachers(state) {
      state.visibleCount += 4;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchTeachers.fulfilled,
        (state, action: PayloadAction<Teacher[]>) => {
          state.status = "succeeded";
          state.teachers = action.payload;
        }
      )
      .addCase(fetchTeachers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  setLanguageFilter,
  setLevelFilter,
  setPriceFilter,
  loadMoreTeachers,
} = teachersSlice.actions;

export const teachersReducer = teachersSlice.reducer;
