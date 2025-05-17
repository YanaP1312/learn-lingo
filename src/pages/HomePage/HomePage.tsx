import HeroImage from "../../components/HeroImage/HeroImage";
import MainInfo from "../../components/MainInfo/MainInfo";
import MainStatistic from "../../components/MainStatistic/MainStatistic";
import s from "./HomePage.module.css";

const HomePage = () => {
  return (
    <main>
      <div className={s.wrap}>
        <MainInfo />
        <HeroImage />
      </div>
      <MainStatistic />
    </main>
  );
};

export default HomePage;
