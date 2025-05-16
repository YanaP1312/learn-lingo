import { useEffect } from "react";
import TeacherList from "../../components/TeachersList/TeachersList";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchTeachers } from "../../redux/teachers/operations";
import {
  selectAllFilteredCount,
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

const TeachersPage = () => {
  const dispatch = useAppDispatch();
  const teachers = useAppSelector(selectVisibleTeachers);
  const totalCount = useAppSelector(selectAllFilteredCount);
  const shouldShowLoadMore = teachers.length < totalCount;
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTeachers());
    }
  }, [dispatch, status]);

  const handleLanguageChange = (value: string | null) => {
    dispatch(setLanguageFilter(value));
  };

  const handleLevelChange = (value: string | null) => {
    dispatch(setLevelFilter(value));
  };

  const handlePriceChange = (value: number | null) => {
    dispatch(setPriceFilter(value));
  };

  const handleAddCads = () => dispatch(loadMoreTeachers());

  return (
    <main>
      <SearchBar
        teachers={teachers}
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
