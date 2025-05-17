import { selectUser } from "../../redux/auth/selectors";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import { useAppSelector } from "../../redux/hook";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import s from "./AppBar.module.css";

const AppBar = () => {
  const user = useAppSelector(selectUser);

  return (
    <header className={s.header}>
      <Navigation />
      <div className={s.wrap}>
        {user ? <UserMenu /> : <AuthNav />}
        <ThemeSelector />
      </div>
    </header>
  );
};

export default AppBar;
