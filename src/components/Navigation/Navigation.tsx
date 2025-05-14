import clsx from "clsx";
import { Link, NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

export const buildLinkClass = ({ isActive }: { isActive: boolean }) => {
  return clsx(s.link, isActive && s.active);
};

export default function Navigation() {
  return (
    <header>
      <Link to="/">
        <svg width={28} height={28}>
          <use href="/sprite.svg#icon-ukraine" />
        </svg>
        LearnLingo
      </Link>
      <nav>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/teachers" className={buildLinkClass}>
          Teachers
        </NavLink>
      </nav>
    </header>
  );
}
