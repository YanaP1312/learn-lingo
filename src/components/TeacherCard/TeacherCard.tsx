import { useState } from "react";
import type { Teacher } from "../../App.types";
import {
  addFavorites,
  removeFavorites,
} from "../../redux/favorites/operations";
import { selectFavorites } from "../../redux/favorites/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import AdditionalInfo from "../AdditionalInfo/AdditionalInfo";
import BookLessonModal from "../BookLessonModal/BookLessonModal";
import { selectUser } from "../../redux/auth/selectors";

interface Props {
  teacher: Teacher;
}

const TeacherCard = ({ teacher }: Props) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const user = useAppSelector(selectUser);
  const [isOpenAdditional, setIsOpenAdditional] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const isFavorite = favorites.some((fav) => fav.id === teacher.id);
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
    <div>
      <div>
        <div>
          <svg width={12} height={12}>
            <use href="/sprite.svg#icon-ellipse" />
          </svg>
          <img src={teacher.avatar_url} width={96} height={96} />
        </div>
      </div>
      <div>
        <div>
          <p>Languages</p>
          <div>
            <ul>
              <li>
                <svg>
                  <use href="/sprite.svg#icon-book" />
                </svg>
                &nbsp;<b>Lessons online</b>
              </li>
              <li>
                <b>Lessons done:&nbsp;{teacher.lessons_done}</b>
              </li>
              <li>
                <svg>
                  <use href="/sprite.svg#icon-star" />
                </svg>
                &nbsp;<b>Rating: {teacher.rating}</b>
              </li>
              <li>
                <b>
                  Price / 1 hour:&nbsp;
                  <span>{`${teacher.price_per_hour}$`}</span>
                </b>
              </li>
            </ul>
            <button onClick={handleFavoriteToggle}>
              <svg>
                <use
                  href={
                    isFavorite
                      ? "/sprite.svg#icon-fill-heart"
                      : "/sprite.svg#icon-empty-heart"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
        <h2>{`${teacher.name} ${teacher.surname}`}</h2>

        <ul>
          <li>
            Speacks:&nbsp;
            <b>
              <u>{teacher.languages.join(", ")}</u>
            </b>
          </li>
          <li>
            Lesson Info:&nbsp;<b>{teacher.lesson_info}</b>
          </li>
          <li>
            Conditions:&nbsp;
            <b>{teacher.conditions.join(", ")}</b>
          </li>
        </ul>
        {!isOpenAdditional ? (
          <button type="button" onClick={() => setIsOpenAdditional(true)}>
            Read more
          </button>
        ) : (
          <AdditionalInfo teacher={teacher} />
        )}
        <ul>
          {teacher.levels.map((level) => (
            <li key={level}>{`#${level}`}</li>
          ))}
        </ul>
        {isOpenAdditional && (
          <button onClick={() => setIsOpenModal(true)}>
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
