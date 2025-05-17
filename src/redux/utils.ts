import type { Teacher } from "../helpers/App.types";

export function filterTeachers(
  teachers: Teacher[],
  filters: {
    languages: string | null;
    levels: string | null;
    price_per_hour: number | null;
  }
): Teacher[] {
  return teachers.filter((teacher) => {
    const matchLang = filters.languages
      ? teacher.languages.includes(filters.languages)
      : true;
    const matchLevel = filters.levels
      ? teacher.levels.includes(filters.levels)
      : true;
    const matchPrice = filters.price_per_hour
      ? teacher.price_per_hour <= filters.price_per_hour
      : true;
    return matchLang && matchLevel && matchPrice;
  });
}
