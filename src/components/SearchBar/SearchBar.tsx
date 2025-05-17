import type { Teacher } from "../../helpers/App.types";
import s from "./SearchBar.module.css";

interface Props {
  teachers: Teacher[];
  onLanguageChange: (value: string | null) => void;
  onLevelChange: (value: string | null) => void;
  onPriceChange: (value: number | null) => void;
}

const getUniqueValues = <T,>(array: T[]): T[] => [...new Set(array)];

const SearchBar = ({
  teachers,
  onLanguageChange,
  onLevelChange,
  onPriceChange,
}: Props) => {
  const languageOptions = getUniqueValues(
    teachers.flatMap((t) => t.languages)
  ).sort();

  const levelOptions = getUniqueValues(
    teachers.flatMap((t) => t.levels)
  ).sort();

  const priceOptions = getUniqueValues(
    teachers.map((t) => t.price_per_hour).sort((a, b) => a - b)
  );

  return (
    <section>
      <div className={s.filterBox}>
        <select onChange={(e) => onLanguageChange(e.target.value || null)}>
          <option value="">All languages</option>
          {languageOptions.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <select onChange={(e) => onLevelChange(e.target.value || null)}>
          <option value="">All levels</option>
          {levelOptions.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <select onChange={(e) => onPriceChange(Number(e.target.value) || null)}>
          <option value="">Any price</option>
          {priceOptions.map((price) => (
            <option key={price} value={price}>
              {`to ${price} $`}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};
export default SearchBar;
