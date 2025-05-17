import s from "./LoadMore.module.css";

interface Props {
  onClick: () => void;
}

const LoadMoreBtn = ({ onClick }: Props) => {
  return (
    <div className={s.wrap}>
      <button className={s.btnLoadMore} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
