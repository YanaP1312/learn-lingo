import HeroImage from "../../components/HeroImage/HeroImage";
import MainInfo from "../../components/MainInfo/MainInfo";
import MainStatistic from "../../components/MainStatistic/MainStatistic";
import { useAppSelector } from "../../redux/hook";
import { selectTheme } from "../../redux/theme/slice";
import s from "./HomePage.module.css";

const HomePage = () => {
  const theme = useAppSelector(selectTheme);

  return (
    <main key={theme}>
      <div className={s.wrap}>
        <MainInfo />
        <HeroImage />
      </div>
      <MainStatistic />
    </main>
  );
};

export default HomePage;
