import TeacherList from "../../components/TeachersList/TeachersList";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  selectFavAllFilteredCount,
  selectFavFilters,
  selectFavVisibleTeachers,
} from "../../redux/favorites/selectors";
import { useEffect } from "react";
import { fetchFavorites } from "../../redux/favorites/operations";
import { selectStatus, selectUser } from "../../redux/auth/selectors";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
  loadMoreFavorites,
  setFavLanguageFilter,
  setFavLevelFilter,
  setFavPriceFilter,
} from "../../redux/favorites/slice";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import { useNavigate } from "react-router-dom";
import { usePersistedFilters } from "../../helpers/usePersistedFilters";

const FavoritesPage = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFavFilters);
  const favTeachers = useAppSelector(selectFavVisibleTeachers);
  const totalFavCount = useAppSelector(selectFavAllFilteredCount);
  const shouldShowLoadMore = favTeachers.length < totalFavCount;
  const user = useAppSelector(selectUser);

  const authStatus = useAppSelector(selectStatus);
  const navigate = useNavigate();
  const { persistFilter } = usePersistedFilters("favorites");

  useEffect(() => {
    if (authStatus !== "checking" && !user) {
      navigate("/");
    }
  }, [authStatus, user, navigate]);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchFavorites(user.uid));
    }
  }, [dispatch, user?.uid]);

  const handleLanguageChange = (value: string | null) => {
    dispatch(setFavLanguageFilter(value));
    persistFilter("language", value);
  };

  const handleLevelChange = (value: string | null) => {
    dispatch(setFavLevelFilter(value));
    persistFilter("level", value);
  };

  const handlePriceChange = (value: number | null) => {
    dispatch(setFavPriceFilter(value));
    persistFilter("price", value);
  };

  const handleAddCads = () => {
    dispatch(loadMoreFavorites());
    persistFilter("visibleCount", favTeachers.length + 4);
  };

  return (
    <main>
      <SearchBar
        teachers={favTeachers}
        languageValue={filters.languages}
        levelValue={filters.levels}
        priceValue={filters.price_per_hour}
        onLanguageChange={handleLanguageChange}
        onLevelChange={handleLevelChange}
        onPriceChange={handlePriceChange}
      />
      <TeacherList teachers={favTeachers} />
      {shouldShowLoadMore && <LoadMoreBtn onClick={handleAddCads} />}
    </main>
  );
};

export default FavoritesPage;
