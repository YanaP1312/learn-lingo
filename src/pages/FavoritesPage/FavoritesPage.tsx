import TeacherList from "../../components/TeachersList/TeachersList";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  selectFavFiltered,
  selectFavorites,
} from "../../redux/favorites/selectors";
import { useEffect } from "react";
import { fetchFavorites } from "../../redux/favorites/operations";
import { selectUser } from "../../redux/auth/selectors";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
  applyFavFilters,
  setFavLanguageFilter,
  setFavLevelFilter,
  setFavPriceFilter,
} from "../../redux/favorites/slice";

const FavoritesPage = () => {
  const dispatch = useAppDispatch();
  const favTeachers = useAppSelector(selectFavFiltered);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchFavorites(user.uid));
    }
  }, [dispatch, user?.uid]);

  const handleLanguageChange = (value: string | null) => {
    dispatch(setFavLanguageFilter(value));
    dispatch(applyFavFilters());
  };

  const handleLevelChange = (value: string | null) => {
    dispatch(setFavLevelFilter(value));
    dispatch(applyFavFilters());
  };

  const handlePriceChange = (value: number | null) => {
    dispatch(setFavPriceFilter(value));
    dispatch(applyFavFilters());
  };

  return (
    <main>
      <SearchBar
        teachers={favTeachers}
        onLanguageChange={handleLanguageChange}
        onLevelChange={handleLevelChange}
        onPriceChange={handlePriceChange}
      />
      <TeacherList teachers={favTeachers} />
    </main>
  );
};

export default FavoritesPage;
