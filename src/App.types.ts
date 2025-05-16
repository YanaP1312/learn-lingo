export type Teacher = {
  id: string;
  avatar_url: string;
  conditions: string[];
  experience: string;
  languages: string[];
  lesson_info: string;
  lessons_done: number;
  levels: string[];
  name: string;
  price_per_hour: number;
  rating: number;
  reviews: Review[];
  surname: string;
};

export type Review = {
  comment: string;
  reviewer_name: string;
  reviewer_rating: number;
};

export interface BaseTeachersState {
  filtered: Teacher[];
  visibleCount: number;
  filters: {
    languages: string | null;
    levels: string | null;
    price_per_hour: number | null;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
}

export interface TeachersState extends BaseTeachersState {
  teachers: Teacher[];
}

export interface FavoritesState extends BaseTeachersState {
  favorites: Teacher[];
}
