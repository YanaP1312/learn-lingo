import { useForm } from "react-hook-form";
import { selectStatus } from "../../redux/auth/selectors";

import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { loginSchema } from "../../helpers/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "../../redux/auth/operations";
import Modal from "../Modal/Modal";
import ModalButton from "../ModalButton/ModalButton";

import s from "./LoginModal.module.css";
import PasswordInput from "../PasswordInput/PasswordInput";

interface Props {
  onClose: () => void;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginModal = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(loginUser(data)).then(() => onClose());
  };

  return (
    <Modal onClose={onClose}>
      <h2>Log In</h2>
      <p>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register("email")} placeholder="Email" />
        <p>{errors.email?.message}</p>

        <PasswordInput
          registration={register("password")}
          error={errors.password?.message}
        />

        <ModalButton>
          {status === "loading" ? "Logging in..." : "Log in"}
        </ModalButton>
      </form>
    </Modal>
  );
};

export default LoginModal;
