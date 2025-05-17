import s from "./MainStatistic.module.css";

const MainStatistic = () => {
  return (
    <div className={s.wrap}>
      <ul className={s.list}>
        <li className={s.item}>
          <b>32,000 +</b>
          <p>Experienced tutors</p>
        </li>
        <li className={s.item}>
          <b>300,000 +</b>
          <p>5-star tutor reviews</p>
        </li>
        <li className={s.item}>
          <b>120 +</b>
          <p>Subjects taught</p>
        </li>
        <li className={s.item}>
          <b>200 +</b>
          <p>Tutor nationalities</p>
        </li>
      </ul>
    </div>
  );
};
export default MainStatistic;
