import type { RootState } from "../store";

export const selectTeachers = (state: RootState) => state.teachers.teachers;
export const selectFiltered = (state: RootState) => state.teachers.filtered;
export const selectVisible = (state: RootState) => state.teachers.visibleCount;
export const selectStatus = (state: RootState) => state.teachers.status;
export const selectFilterLang = (state: RootState) =>
  state.teachers.filters.languages;
export const selectFilterLevel = (state: RootState) =>
  state.teachers.filters.levels;
export const selectFilterPrice = (state: RootState) =>
  state.teachers.filters.price_per_hour;
