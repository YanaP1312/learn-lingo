import { useEffect } from "react";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";
import { setAuthStatus, setUser } from "./redux/auth/slice";
import { auth } from "./helpers/firebase";
import { Navigate, Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import HomePage from "./pages/HomePage/HomePage";
import TeachersPage from "./pages/TeachersPage/TeachersPage";
import { selectStatus, selectUser } from "./redux/auth/selectors";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { fetchFavorites } from "./redux/favorites/operations";
import { selectTheme } from "./redux/theme/slice";
import { themes } from "./helpers/themes";
import { ToastContainer } from "react-toastify";
import { clearFavorites } from "./redux/favorites/slice";

function App() {
  const currentUser = useAppSelector(selectUser);

  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectStatus);
  const theme = useAppSelector(selectTheme);
  useEffect(() => {
    const selected = themes[theme];
    document.documentElement.style.setProperty("--themeColor", selected.color);
    document.documentElement.style.setProperty(
      "--accentColor",
      selected.accentColor
    );
  }, [theme]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
        dispatch(setAuthStatus("authenticated"));
      } else {
        dispatch(setUser(null));
        dispatch(setAuthStatus("unauthenticated"));
        dispatch(clearFavorites());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (currentUser?.uid) {
      dispatch(fetchFavorites(currentUser.uid));
    }
  }, [currentUser?.uid, dispatch]);
  if (authStatus === "checking") return null;

  return (
    <div className="container">
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route
          path="/favorites"
          element={currentUser ? <FavoritesPage /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
