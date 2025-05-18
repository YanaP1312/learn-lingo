import type { Teacher } from "../../helpers/App.types";
import { FaStar } from "react-icons/fa";
import s from "./AdditionalInfo.module.css";

interface Props {
  teacher: Teacher;
}

const AdditionalInfo = ({ teacher }: Props) => {
  return (
    <div>
      <p style={{ marginBottom: "32px" }}>{teacher.experience}</p>
      <ul className={s.listReviews}>
        {teacher.reviews.map((review) => (
          <li key={review.reviewer_name}>
            <div className={s.wrap}>
              <div className={s.wrapImg}>
                <img
                  style={{ borderRadius: "50%" }}
                  src="/image/comment.png"
                  width={44}
                  height={44}
                  alt="Student avatar"
                />
              </div>

              <div>
                <p style={{ color: "var(--grey)" }}>{review.reviewer_name}</p>
                <div className={s.wrapRating}>
                  <FaStar className={s.listIcon} />
                  <p>{review.reviewer_rating.toFixed(1)}</p>
                </div>
              </div>
            </div>
            <b>{review.comment}</b>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdditionalInfo;
