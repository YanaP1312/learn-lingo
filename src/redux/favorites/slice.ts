import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addFavorites, fetchFavorites, removeFavorite } from "./operations";
import type { FavoritesState } from "../../App.types";
import { filterTeachers } from "../utils";

const initialState: FavoritesState = {
  favorites: [],
  filtered: [],
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
    applyFavFilters(state) {
      state.filtered = filterTeachers(state.favorites, state.filters);
      state.visibleCount = 4;
    },

    loadMoreFavorites(state) {
      state.visibleCount += 4;
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
        state.filtered = filterTeachers(action.payload, state.filters);
      })
      .addCase(addFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.filtered = filterTeachers(action.payload, state.filters);
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.filtered = filterTeachers(action.payload, state.filters);
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
  applyFavFilters,
  loadMoreFavorites,
} = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
