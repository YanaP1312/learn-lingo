interface Props {
  onClick: () => void;
}

const LoadMoreBtn = ({ onClick }: Props) => {
  return <button onClick={onClick}>Load more</button>;
};

export default LoadMoreBtn;
