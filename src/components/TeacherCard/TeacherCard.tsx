import type { Teacher } from "../../App.types";

const TeacherCard = (teacher) => {
  return (
    <div>
      <div>
        <div>
          <svg>
            <use href="/sprite.svg#icon-ellipse" />
          </svg>
          <img src={teacher.avatar_url} width={96} />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default TeacherCard;
