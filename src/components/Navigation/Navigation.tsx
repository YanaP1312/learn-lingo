import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <header>
      <Link to="/">
        <svg>
          <use width={28} height={28} />
        </svg>
        LearnLingo
      </Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/teachers">Teachers</NavLink>
      </nav>
    </header>
  );
}
