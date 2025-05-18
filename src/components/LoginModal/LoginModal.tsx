import { useForm } from "react-hook-form";
import { selectError, selectStatus } from "../../redux/auth/selectors";

import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { loginSchema } from "../../helpers/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "../../redux/auth/operations";
import Modal from "../Modal/Modal";
import ModalButton from "../ModalButton/ModalButton";

import s from "./LoginModal.module.css";
import PasswordInput from "../PasswordInput/PasswordInput";
import { toast } from "react-toastify";

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
  const error = useAppSelector(selectError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      toast("🍀 Welcome!");
      onClose();
    } catch {
      if (error) toast.error(error);
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2 className={s.title}>Log In</h2>
      <p className={s.desc}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.wrapInput}>
          <div>
            <input type="email" {...register("email")} placeholder="Email" />
            <p className="error">{errors.email?.message}</p>
          </div>

          <PasswordInput
            registration={register("password")}
            error={errors.password?.message}
          />
        </div>

        <ModalButton>
          {status === "loading" ? "Logging in..." : "Log in"}
        </ModalButton>
      </form>
    </Modal>
  );
};

export default LoginModal;
