import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { logoutUser } from "../../redux/auth/operations";
import s from "./UserMenu.module.css";
import { buildLinkClass } from "../Navigation/Navigation";
import { CiLogout } from "react-icons/ci";

export default function UserMenu() {
  const dispatch = useAppDispatch();
  return (
    <div className={s.wrap}>
      <NavLink to="/favorites" className={buildLinkClass}>
        Favorites
      </NavLink>

      <button
        className="logBtn"
        type="button"
        onClick={() => dispatch(logoutUser())}
      >
        <CiLogout className="logIcon" />
        Log out
      </button>
    </div>
  );
}
