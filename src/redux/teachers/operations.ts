import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, getDatabase, ref } from "firebase/database";
import type { Teacher } from "../../helpers/App.types";

export const fetchTeachers = createAsyncThunk<Teacher[]>(
  "teachers/fetchTeachers",
  async () => {
    const db = getDatabase();
    const snapshot = await get(ref(db, "teachers"));
    const data = snapshot.val();
    if (!data) return [];
    return Object.entries(data).map(([id, value]) => ({
      id,
      ...(value as Omit<Teacher, "id">),
    }));
  }
);
