import { useEffect } from "react";
import TeacherList from "../../components/TeachersList/TeachersList";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchTeachers } from "../../redux/teachers/operations";
import {
  selectAllFilteredCount,
  selectFilters,
  selectStatus,
  selectVisibleTeachers,
} from "../../redux/teachers/selectors";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
  loadMoreTeachers,
  setLanguageFilter,
  setLevelFilter,
  setPriceFilter,
} from "../../redux/teachers/slice";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import { usePersistedFilters } from "../../helpers/usePersistedFilters";

const TeachersPage = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const teachers = useAppSelector(selectVisibleTeachers);
  const totalCount = useAppSelector(selectAllFilteredCount);
  const shouldShowLoadMore = teachers.length < totalCount;
  const status = useAppSelector(selectStatus);
  const { persistFilter } = usePersistedFilters("teachers");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTeachers());
    }
  }, [dispatch, status]);

  const handleLanguageChange = (value: string | null) => {
    dispatch(setLanguageFilter(value));
    persistFilter("language", value);
  };

  const handleLevelChange = (value: string | null) => {
    dispatch(setLevelFilter(value));
    persistFilter("level", value);
  };

  const handlePriceChange = (value: number | null) => {
    dispatch(setPriceFilter(value));
    persistFilter("price", value);
  };

  const handleAddCads = () => {
    dispatch(loadMoreTeachers());
    persistFilter("visibleCount", teachers.length + 4);
  };

  return (
    <main>
      <SearchBar
        teachers={teachers}
        languageValue={filters.languages}
        levelValue={filters.levels}
        priceValue={filters.price_per_hour}
        onLanguageChange={handleLanguageChange}
        onLevelChange={handleLevelChange}
        onPriceChange={handlePriceChange}
      />
      <TeacherList teachers={teachers} />
      {shouldShowLoadMore && <LoadMoreBtn onClick={handleAddCads} />}
    </main>
  );
};

export default TeachersPage;
