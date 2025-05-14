import { useForm } from "react-hook-form";
import { selectStatus } from "../../redux/auth/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validationSchema";
import { registerUser } from "../../redux/auth/operations";
import Modal from "../Modal/Modal";
import ModalButton from "../ModalButton/ModalButton";
import PasswordInput from "../PasswordInput/PasswordInput";

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
  };

  return (
    <Modal onClose={onClose}>
      <h2>Registration</h2>
      <p>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Name" />
        <p>{errors.name?.message}</p>
        <input {...register("email")} placeholder="Email" />
        <p>{errors.email?.message}</p>

        <PasswordInput
          registration={register("password")}
          error={errors.password?.message}
        />
        <ModalButton>
          {status === "loading" ? "Signing up..." : "Register"}
        </ModalButton>
      </form>
    </Modal>
  );
};

export default RegisterModal;
