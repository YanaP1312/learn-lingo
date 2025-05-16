import { useEffect } from "react";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";
import { setAuthStatus, setUser } from "./redux/auth/slice";
import { auth } from "./firebase";
import { Navigate, Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import HomePage from "./pages/HomePage/HomePage";
import TeachersPage from "./pages/TeachersPage/TeachersPage";
import { selectStatus, selectUser } from "./redux/auth/selectors";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { fetchFavorites } from "./redux/favorites/operations";

function App() {
  const currentUser = useAppSelector(selectUser);

  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectStatus);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const serializedUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        };
        dispatch(setUser(serializedUser));
        dispatch(setAuthStatus("authenticated"));
      } else {
        dispatch(setUser(null));
        dispatch(setAuthStatus("unauthenticated"));
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
