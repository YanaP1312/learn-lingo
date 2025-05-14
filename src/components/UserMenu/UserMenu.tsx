import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { logoutUser } from "../../redux/auth/operations";
import s from "./UserMenu.module.css";
import { buildLinkClass } from "../Navigation/Navigation";

export default function UserMenu() {
  const dispatch = useAppDispatch();
  return (
    <div>
      <NavLink to="/favorites" className={buildLinkClass}>
        Favorites
      </NavLink>

      <button type="button" onClick={() => dispatch(logoutUser())}>
        <svg width="20" height="20">
          <use href="/sprite.svg#icon-log-in" />
        </svg>
        Log out
      </button>
    </div>
  );
}
