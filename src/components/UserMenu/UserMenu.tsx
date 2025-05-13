import { Link } from "react-router-dom";

export default function UserMenu() {
  return (
    <div>
      <button type="button">
        <svg width="20" height="20">
          <use href="/sprite.svg#icon-log-in" />
        </svg>
        Log out
      </button>
      <button>
        <Link to="/favorites">Favorites </Link>
      </button>
    </div>
  );
}
