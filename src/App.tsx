import { useEffect } from "react";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "./redux/auth/slice";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import HomePage from "./pages/HomePage/HomePage";
import TeachersPage from "./pages/TeachersPage/TeachersPage";
import { selectUser } from "./redux/auth/selectors";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import { useAppSelector } from "./redux/hook";

function App() {
  const currentUser = useAppSelector(selectUser);

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const serializedUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        };
        dispatch(setUser(serializedUser));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div>
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
    </div>
  );
}

export default App;
