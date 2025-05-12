import type { RootState } from "../store";

export const selectUser = (state: RootState) => state.auth.user;
export const selectStatus = (state: RootState) => state.auth.status;
