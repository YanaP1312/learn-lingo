import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase } from "firebase/database";

export const fetchTeachers = createAsyncThunk('teachers/fetchTeachers', const db = getDatabase());
