import { useState } from "react";
import type { Teacher } from "../../helpers/App.types";
import {
  addFavorites,
  removeFavorites,
} from "../../redux/favorites/operations";
import { selectFavorites } from "../../redux/favorites/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import AdditionalInfo from "../AdditionalInfo/AdditionalInfo";
import BookLessonModal from "../BookLessonModal/BookLessonModal";
import { selectUser } from "../../redux/auth/selectors";
import s from "./TeacherCard.module.css";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";

interface Props {
  teacher: Teacher;
}

const TeacherCard = ({ teacher }: Props) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const user = useAppSelector(selectUser);
  const [isOpenAdditional, setIsOpenAdditional] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const isFavorite = favorites.some((fav) => fav?.id === teacher.id);

  const handleFavoriteToggle = () => {
    if (!user?.uid) return;
    const payload = { userId: user.uid, teacherId: teacher.id };

    if (isFavorite) {
      dispatch(removeFavorites(payload));
    } else {
      dispatch(addFavorites(payload));
    }
  };

  return (
    <div className={s.wrap}>
      <div>
        <div className={s.avatarWrapper}>
          <img
            className={s.avatar}
            src={teacher.avatar_url}
            width={96}
            height={96}
          />
          <div className={s.statusDot}></div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <div className={s.wrapBasicInfo}>
          <p className={s.topic}>Languages</p>
          <div className={s.wrapListFav}>
            <ul className={s.listBasicInfo}>
              <li>
                <IoBookOutline className={s.listIcon} />
                &nbsp;<b>Lessons online</b>
              </li>
              <li>
                <b>Lessons done:&nbsp;{teacher.lessons_done}</b>
              </li>
              <li>
                <FaStar className={s.listIcon} />
                &nbsp;<b>Rating: {teacher.rating}</b>
              </li>
              <li>
                <b>
                  Price / 1 hour:&nbsp;
                  <span
                    style={{ color: "var(--accentColor)" }}
                  >{`${teacher.price_per_hour}$`}</span>
                </b>
              </li>
            </ul>
            <button onClick={handleFavoriteToggle}>
              {isFavorite ? (
                <FaHeart className={s.iconHeart} />
              ) : (
                <FaRegHeart className={s.iconHeart} />
              )}
            </button>
          </div>
        </div>
        <h2>{`${teacher.name} ${teacher.surname}`}</h2>

        <ul className={s.listAdditional}>
          <li>
            <p className={s.topic}>Speacks:</p>&nbsp;
            <b>
              <u>{teacher.languages.join(", ")}</u>
            </b>
          </li>
          <li>
            <p className={s.topic}>Lesson Info:</p>&nbsp;
            <b>{teacher.lesson_info}</b>
          </li>
          <li>
            <p className={s.topic}>Conditions:</p>&nbsp;
            <b>{teacher.conditions.map((cond) => `"${cond}"`).join(", ")}</b>
          </li>
        </ul>
        {!isOpenAdditional ? (
          <button
            className={s.btnRead}
            type="button"
            onClick={() => setIsOpenAdditional(true)}
          >
            <u>Read more</u>
          </button>
        ) : (
          <AdditionalInfo teacher={teacher} />
        )}
        <ul className={s.languageList}>
          {teacher.levels.map((level) => (
            <li key={level}>{`#${level}`}</li>
          ))}
        </ul>
        {isOpenAdditional && (
          <button className={s.btnBook} onClick={() => setIsOpenModal(true)}>
            Book trial lesson
          </button>
        )}
        {isOpenModal && (
          <BookLessonModal
            onClose={() => setIsOpenModal(false)}
            teacher={teacher}
          />
        )}
      </div>
    </div>
  );
};

export default TeacherCard;
