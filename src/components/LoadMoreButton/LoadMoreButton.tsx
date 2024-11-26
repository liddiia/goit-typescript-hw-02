import css from "./LoadMoreButton.module.css";

interface LoadMoreButtonProps {
  onClick: () => void; 
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => {
  return (
    <button
      className={css.LoadMoreButtonn}
      onClick={onClick}
      type="button"
    >
      Load more
    </button>
  );
};

export default LoadMoreButton;