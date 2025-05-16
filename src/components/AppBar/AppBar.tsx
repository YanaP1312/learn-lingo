import { selectUser } from "../../redux/auth/selectors";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import { useAppSelector } from "../../redux/hook";

const AppBar = () => {
  const user = useAppSelector(selectUser);

  return (
    <header>
      <Navigation />
      {user ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;
