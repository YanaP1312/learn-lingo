import { selectUser } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";

const AppBar = () => {
  const user = useSelector(selectUser);
  return (
    <header>
      <Navigation />
      {user ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;
