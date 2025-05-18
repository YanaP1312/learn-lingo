import { useForm } from "react-hook-form";
import { selectStatus } from "../../redux/auth/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../helpers/validationSchema";
import { registerUser } from "../../redux/auth/operations";
import Modal from "../Modal/Modal";
import ModalButton from "../ModalButton/ModalButton";
import PasswordInput from "../PasswordInput/PasswordInput";
import s from "./RegisterModal.module.css";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
}

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
}

const RegisterModal = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({ resolver: yupResolver(registerSchema) });

  const onSubmit = (data: RegisterFormInputs) => {
    dispatch(registerUser(data)).then(() => onClose());
    toast("🍀  Welcome");
  };

  return (
    <Modal onClose={onClose}>
      <h2 className={s.title}>Registration</h2>
      <p className={s.desc}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.wrapInput}>
          <div>
            <input {...register("name")} placeholder="Name" />
            <p className="error">{errors.name?.message}</p>
          </div>
          <div>
            <input {...register("email")} placeholder="Email" />
            <p className="error">{errors.email?.message}</p>
          </div>

          <PasswordInput
            registration={register("password")}
            error={errors.password?.message}
          />
        </div>
        <ModalButton>
          {status === "loading" ? "Signing up..." : "Register"}
        </ModalButton>
      </form>
    </Modal>
  );
};

export default RegisterModal;
