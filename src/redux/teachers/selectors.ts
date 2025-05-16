import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { filterTeachers } from "../utils";

export const selectTeachers = (state: RootState) => state.teachers.teachers;

export const selectVisible = (state: RootState) => state.teachers.visibleCount;
export const selectStatus = (state: RootState) => state.teachers.status;
export const selectFilters = (state: RootState) => state.teachers.filters;

export const selectFiltered = createSelector(
  [selectTeachers, selectFilters],
  (favorites, filters) => filterTeachers(favorites, filters)
);

export const selectVisibleTeachers = createSelector(
  [selectFiltered, selectVisible],
  (filtered, visibleCount) => filtered.slice(0, visibleCount)
);

export const selectAllFilteredCount = createSelector(
  [selectFiltered],
  (filtered) => filtered.length
);
