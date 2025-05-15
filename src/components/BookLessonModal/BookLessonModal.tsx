import { useForm } from "react-hook-form";
import Modal from "../Modal/Modal";
import ModalButton from "../ModalButton/ModalButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookLessonSchema } from "../../validationSchema";

interface Props {
  onClose: () => void;
}

interface BookLessonData {
  fullName: string;
  email: string;
  phone: string;
  reason: string;
}

const BookLessonModal = ({ teacher }, { onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookLessonData>({ resolver: yupResolver(bookLessonSchema) });
  const onSubmit = (data: BookLessonData) => {
    console.log("Book lesson", data);
  };
  return (
    <Modal onClose={onClose}>
      <h2>Book trial lesson</h2>
      <p>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>
      <div>
        <div>
          <img
            src={teacher.avatar_url}
            alt="Teacher foto"
            width={44}
            height={44}
          />
        </div>
        <div>
          <p>Your teacher</p>
          <b>{`${teacher.name}&nbsp;${teacher.surname}`}</b>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>What is your main reason for learning English?</legend>
          <label>
            <input type="radio" value="career" {...register("reason")} />
            Career and business
          </label>
          <label>
            <input type="radio" value="kids" {...register("reason")} />
            Lesson for kids
          </label>
          <label>
            <input type="radio" value="abroad" {...register("reason")} />
            Living abroad
          </label>
          <label>
            <input type="radio" value="exams" {...register("reason")} />
            Exams and coursework
          </label>
          <label>
            <input type="radio" value="hobby" {...register("reason")} />
            Culture, travel or hobby
          </label>
          <p>{errors.reason?.message}</p>
        </fieldset>
        <input {...register("fullName")} placeholder="Full Name" />
        <p>{errors.fullName?.message}</p>
        <input {...register("email")} placeholder="Email" />
        <p>{errors.email?.message}</p>
        <input {...register("phone")} placeholder="Phone number" />
        <p>{errors.phone?.message}</p>

        <ModalButton>Book</ModalButton>
      </form>
    </Modal>
  );
};

export default BookLessonModal;
