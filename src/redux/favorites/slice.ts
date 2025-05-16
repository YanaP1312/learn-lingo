import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addFavorites, fetchFavorites, removeFavorites } from "./operations";
import type { FavoritesState } from "../../App.types";

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
      })
      .addCase(addFavorites.fulfilled, (state, action) => {
        const teacher = action.payload;
        if (teacher && !state.favorites.some((t) => t.id === teacher.id)) {
          state.favorites.push(teacher);
        }
        console.log("CHECKING IF ALREADY FAVORITE:", teacher?.id);
      })
      .addCase(removeFavorites.fulfilled, (state, action) => {
        console.log("Removing from state:", action.payload);
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
  loadMoreFavorites,
} = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
