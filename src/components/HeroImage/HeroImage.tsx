import { themes } from "../../helpers/themes";
import { useAppSelector } from "../../redux/hook";
import { selectTheme } from "../../redux/theme/slice";
import s from "./HeroImage.module.css";

const HeroImage = () => {
  const theme = useAppSelector(selectTheme);
  const image = themes[theme].heroImg;
  const imageRes = themes[theme].heroImg2x;

  return (
    <div className={s.wrap}>
      <img
        srcSet={`${imageRes} 2x, ${image} 1x`}
        src={image}
        alt="Girl with laptop"
        width="568"
        height="530"
      />
    </div>
  );
};
export default HeroImage;
