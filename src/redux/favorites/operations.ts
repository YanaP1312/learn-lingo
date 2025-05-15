import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, getDatabase, ref, set } from "firebase/database";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (userId: string) => {
    const db = getDatabase();
    const snapshot = await get(ref(db, `favorites/${userId}`));
    return snapshot.val() || [];
  }
);

export const addFavorites = createAsyncThunk(
  "favorites/addFavorite",
  async ({ userId, teacherId }: { userId: string; teacherId: string }) => {
    const db = getDatabase();
    const userFavRef = ref(db, `favorites/${userId}`);
    const snapshot = await get(userFavRef);
    const currentFavorites = snapshot.val() || [];
    const updatedFavorites = [...currentFavorites, teacherId];
    await set(userFavRef, updatedFavorites);
    return updatedFavorites;
  }
);

export const removeFavorites = createAsyncThunk(
  "favorites/removeFavorites",
  async ({ userId, teacherId }: { userId: string; teacherId: string }) => {
    const db = getDatabase();
    const userFavRef = ref(db, `favorites/${userId}`);
    const snapshot = await get(userFavRef);
    const currentFavorites = snapshot.val() || [];

    const updateFavorites = currentFavorites.filter(
      (id: string) => id !== teacherId
    );
    await set(userFavRef, updateFavorites);
    return updateFavorites;
  }
);
