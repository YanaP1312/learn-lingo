import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addFavorites, fetchFavorites, removeFavorites } from "./operations";
import type { FavoritesState } from "../../helpers/App.types";

const initialState: FavoritesState = {
  favorites: [],
  visibleCount: 4,
  filters: {
    languages: null,
    levels: null,
    price_per_hour: null,
  },
  status: "idle",
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavLanguageFilter(state, action: PayloadAction<string | null>) {
      state.filters.languages = action.payload;
    },
    setFavLevelFilter(state, action: PayloadAction<string | null>) {
      state.filters.levels = action.payload;
    },
    setFavPriceFilter(state, action: PayloadAction<number | null>) {
      state.filters.price_per_hour = action.payload;
    },
    setFavVisibleCount(state, action: PayloadAction<number>) {
      state.visibleCount = action.payload;
    },
    loadMoreFavorites(state) {
      state.visibleCount += 4;
    },
    clearFavorites(state) {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favorites = action.payload;
      })
      .addCase(addFavorites.fulfilled, (state, action) => {
        const teacher = action.payload;
        if (teacher && !state.favorites.some((t) => t.id === teacher.id)) {
          state.favorites.push(teacher);
        }
      })
      .addCase(removeFavorites.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          (t) => t.id !== action.payload
        );
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  setFavLanguageFilter,
  setFavLevelFilter,
  setFavPriceFilter,
  setFavVisibleCount,
  loadMoreFavorites,
  clearFavorites,
} = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
