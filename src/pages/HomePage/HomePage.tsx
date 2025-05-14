import HeroImage from "../../components/HeroImage/HeroImage";
import MainInfo from "../../components/MainInfo/MainInfo";
import MainStatistic from "../../components/MainStatistic/MainStatistic";

const HomePage = () => {
  return (
    <main>
      <div>
        <MainInfo />
        <HeroImage />
      </div>
      <MainStatistic />
    </main>
  );
};

export default HomePage;
