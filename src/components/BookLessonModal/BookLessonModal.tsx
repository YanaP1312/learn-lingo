import { useForm } from "react-hook-form";
import Modal from "../Modal/Modal";
import ModalButton from "../ModalButton/ModalButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookLessonSchema } from "../../helpers/validationSchema";
import type { Teacher } from "../../helpers/App.types";
import s from "./BookLessonModal.module.css";
import { toast } from "react-toastify";

interface BookLessonModalProps {
  teacher: Teacher;
  onClose: () => void;
}

interface BookLessonData {
  fullName: string;
  email: string;
  phone: string;
  reason: string;
}

const BookLessonModal = ({ teacher, onClose }: BookLessonModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookLessonData>({ resolver: yupResolver(bookLessonSchema) });
  const onSubmit = (data: BookLessonData) => {
    onClose();
    toast("🍀  Thanks for your booking! Our manager will contact with you");
    console.log("Book lesson", data);
  };
  return (
    <Modal onClose={onClose}>
      <h2 className={s.title}>Book trial lesson</h2>
      <p className={s.desc}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>
      <div className={s.wrapInfo}>
        <div>
          <img
            src={teacher.avatar_url}
            alt="Teacher foto"
            width={44}
            height={44}
          />
        </div>
        <div className={s.teacherInfo}>
          <p>Your teacher</p>
          <b>{`${teacher.name} ${teacher.surname}`}</b>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={s.fieldsetBook}>
          <legend>What is your main reason for learning English?</legend>
          <div>
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
          </div>
          <p className="error">{errors.reason?.message}</p>
        </fieldset>
        <div className={s.wrapInputs}>
          <div>
            <input {...register("fullName")} placeholder="Full Name" />
            <p className="error">{errors.fullName?.message}</p>
          </div>
          <div>
            <input {...register("email")} placeholder="Email" />
            <p className="error">{errors.email?.message}</p>
          </div>
          <div>
            <input {...register("phone")} placeholder="Phone number" />
            <p className="error">{errors.phone?.message}</p>
          </div>
        </div>

        <ModalButton>Book</ModalButton>
      </form>
    </Modal>
  );
};

export default BookLessonModal;
