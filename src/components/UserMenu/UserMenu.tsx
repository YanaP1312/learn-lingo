export default function UserMenu() {
  return (
    <div>
      <button type="button">
        <svg width="20" height="20">
          <use href="/sprite.svg#icon-log-in" />
        </svg>
        Log out
      </button>
      <Favorites to="/favorites" />
    </div>
  );
}
