import { useEffect } from "react";
import { useAppDispatch } from "../redux/hook";
import {
  setLanguageFilter,
  setLevelFilter,
  setPriceFilter,
  setVisibleCount,
} from "../redux/teachers/slice";
import {
  setFavLanguageFilter,
  setFavLevelFilter,
  setFavPriceFilter,
  setFavVisibleCount,
} from "../redux/favorites/slice";

type PageType = "teachers" | "favorites";
const storageKey = (key: string, page: PageType) => `${page}_${key}`;

export const usePersistedFilters = (page: PageType) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const lang = sessionStorage.getItem(storageKey("language", page));
    const level = sessionStorage.getItem(storageKey("level", page));
    const price = sessionStorage.getItem(storageKey("price", page));
    const visibleCount = sessionStorage.getItem(
      storageKey("visibleCount", page)
    );

    if (page === "teachers") {
      if (lang) dispatch(setLanguageFilter(lang));
      if (level) dispatch(setLevelFilter(level));
      if (price) dispatch(setPriceFilter(Number(price)));
      if (visibleCount) dispatch(setVisibleCount(Number(visibleCount)));
    }

    if (page === "favorites") {
      if (lang) dispatch(setFavLanguageFilter(lang));
      if (level) dispatch(setFavLevelFilter(level));
      if (price) dispatch(setFavPriceFilter(Number(price)));
      if (visibleCount) dispatch(setFavVisibleCount(Number(visibleCount)));
    }
  }, [dispatch, page]);

  const persistFilter = (
    key: "language" | "level" | "price" | "visibleCount",
    value: string | number | null
  ) => {
    if (value === null || value === undefined) {
      sessionStorage.removeItem(storageKey(key, page));
    } else {
      sessionStorage.setItem(storageKey(key, page), value.toString());
    }
  };

  return { persistFilter };
};
