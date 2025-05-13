import { useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "./redux/auth/slice";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Navigation />
    </div>
<Routes>
        <Route/>
</Routes>
  );
}

export default App;
