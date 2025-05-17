import { useNavigate } from "react-router-dom";
import s from "./MainInfo.module.css";

const MainInfo = () => {
  const navigate = useNavigate();
  return (
    <div className={s.wrap}>
      <h1>
        Unlock your potential with the best{" "}
        <i style={{ backgroundColor: "var(--themeColor)" }}>language</i> tutors
      </h1>
      <p>
        Embark on an Exciting Language Journey with Expert Language Tutors:
        Elevate your language proficiency to new heights by connecting with
        highly qualified and experienced tutors.
      </p>
      <button
        className={s.btn}
        type="button"
        onClick={() => navigate("/teachers")}
      >
        Get started
      </button>
    </div>
  );
};

export default MainInfo;
