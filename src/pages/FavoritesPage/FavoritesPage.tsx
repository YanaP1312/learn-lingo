import TeacherList from "../../components/TeachersList/TeachersList";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  selectFavAllFilteredCount,
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

const FavoritesPage = () => {
  const dispatch = useAppDispatch();
  const favTeachers = useAppSelector(selectFavVisibleTeachers);
  const totalFavCount = useAppSelector(selectFavAllFilteredCount);
  const shouldShowLoadMore = favTeachers.length < totalFavCount;
  const user = useAppSelector(selectUser);

  const authStatus = useAppSelector(selectStatus);
  const navigate = useNavigate();

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
  };

  const handleLevelChange = (value: string | null) => {
    dispatch(setFavLevelFilter(value));
  };

  const handlePriceChange = (value: number | null) => {
    dispatch(setFavPriceFilter(value));
  };

  const handleAddCads = () => dispatch(loadMoreFavorites());

  return (
    <main>
      <SearchBar
        teachers={favTeachers}
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
