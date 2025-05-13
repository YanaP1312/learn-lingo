import type { RootState } from "../store";

export const selectFavorites = (state: RootState) => state.favorites.favorites;
export const selectFavFiltered = (state: RootState) => state.favorites.filtered;
export const selectFavVisible = (state: RootState) =>
  state.favorites.visibleCount;
export const selectFavStatus = (state: RootState) => state.favorites.status;
export const selectFavFilterLang = (state: RootState) =>
  state.favorites.filters.languages;
export const selectFavFilterLevel = (state: RootState) =>
  state.favorites.filters.levels;
export const selectFavFilterPrice = (state: RootState) =>
  state.favorites.filters.price_per_hour;
