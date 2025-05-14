import { useNavigate } from "react-router-dom";

const MainInfo = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>
        Unlock your potential with the best <span>language</span> tutors
      </h1>
      <p>
        Embark on an Exciting Language Journey with Expert Language Tutors:
        Elevate your language proficiency to new heights by connecting with
        highly qualified and experienced tutors.
      </p>
      <button type="button" onClick={() => navigate("/teachers")}>
        Get started
      </button>
    </div>
  );
};

export default MainInfo;
