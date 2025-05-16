import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { filterTeachers } from "../utils";

export const selectFavorites = (state: RootState) => state.favorites.favorites;

export const selectFavVisible = (state: RootState) =>
  state.favorites.visibleCount;
export const selectFavStatus = (state: RootState) => state.favorites.status;
export const selectFavFilters = (state: RootState) => state.favorites.filters;

export const selectFavFiltered = createSelector(
  [selectFavorites, selectFavFilters],
  (favorites, filters) => filterTeachers(favorites, filters)
);

export const selectFavVisibleTeachers = createSelector(
  [selectFavFiltered, selectFavVisible],
  (filtered, visibleCount) => filtered.slice(0, visibleCount)
);

export const selectFavAllFilteredCount = createSelector(
  [selectFavFiltered],
  (filtered) => filtered.length
);
