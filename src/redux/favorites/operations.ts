import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, getDatabase, ref, remove, set } from "firebase/database";
import type { Teacher } from "../../helpers/App.types";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (userId: string) => {
    const db = getDatabase();
    const snapshot = await get(ref(db, `favorites/${userId}`));
    const data = snapshot.val();

    if (!data) return [];

    const teacherIds = Object.keys(data);

    const teacherPromises = teacherIds.map(async (id) => {
      const teacherSnapshot = await get(ref(db, `teachers/${id}`));
      const teacher = teacherSnapshot.val();
      console.log("ADDED FAVORITE:", { ...teacher, id });

      return teacher ? { ...teacher, id } : null;
    });

    const teachers = (await Promise.all(teacherPromises)).filter(
      (t): t is Teacher => t !== null
    );

    return teachers;
  }
);

export const addFavorites = createAsyncThunk(
  "favorites/addFavorite",
  async ({ userId, teacherId }: { userId: string; teacherId: string }) => {
    const db = getDatabase();
    const userFavRef = ref(db, `favorites/${userId}/${teacherId}`);
    await set(userFavRef, true);
    const teacherSnapshot = await get(ref(db, `teachers/${teacherId}`));
    const teacher = teacherSnapshot.val();
    console.log("ADDED FAVORITE:", { ...teacher, id: teacherId });

    return teacher ? { ...teacher, id: teacherId } : null;
  }
);

export const removeFavorites = createAsyncThunk(
  "favorites/removeFavorites",
  async ({ userId, teacherId }: { userId: string; teacherId: string }) => {
    const db = getDatabase();
    console.log("REMOVING FAVORITE:", userId, teacherId);

    await remove(ref(db, `favorites/${userId}/${teacherId}`));
    return teacherId;
  }
);
