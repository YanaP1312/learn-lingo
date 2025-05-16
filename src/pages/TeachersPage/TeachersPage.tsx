import { useEffect } from "react";
import TeacherList from "../../components/TeachersList/TeachersList";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchTeachers } from "../../redux/teachers/operations";
import { selectFiltered, selectStatus } from "../../redux/teachers/selectors";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
  applyFilters,
  setLanguageFilter,
  setLevelFilter,
  setPriceFilter,
} from "../../redux/teachers/slice";

const TeachersPage = () => {
  const dispatch = useAppDispatch();
  const teachers = useAppSelector(selectFiltered);
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTeachers());
    }
  }, [dispatch, status]);

  const handleLanguageChange = (value: string | null) => {
    dispatch(setLanguageFilter(value));
    dispatch(applyFilters());
  };

  const handleLevelChange = (value: string | null) => {
    dispatch(setLevelFilter(value));
    dispatch(applyFilters());
  };

  const handlePriceChange = (value: number | null) => {
    dispatch(setPriceFilter(value));
    dispatch(applyFilters());
  };

  return (
    <main>
      <SearchBar
        teachers={teachers}
        onLanguageChange={handleLanguageChange}
        onLevelChange={handleLevelChange}
        onPriceChange={handlePriceChange}
      />
      <TeacherList teachers={teachers} />
    </main>
  );
};

export default TeachersPage;
