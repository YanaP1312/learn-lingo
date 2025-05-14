import s from "./ModalButton.module.css";

export interface ModalButtonProps {
  children: string;
}

const ModalButton = ({ children }: ModalButtonProps) => {
  return (
    <button type="submit" className={s.btn}>
      {children}
    </button>
  );
};

export default ModalButton;
