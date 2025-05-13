import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchTeachers } from "./operations";
import type { Teacher, TeachersState } from "../../App.types";
import { filterTeachers } from "../utils";

const initialState: TeachersState = {
  teachers: [],
  filtered: [],
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
    applyFilters(state) {
      state.filtered = filterTeachers(state.teachers, state.filters);
      state.visibleCount = 4;
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
          state.filtered = filterTeachers(action.payload, state.filters);
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
  applyFilters,
} = teachersSlice.actions;

export const teachersReducer = teachersSlice.reducer;
