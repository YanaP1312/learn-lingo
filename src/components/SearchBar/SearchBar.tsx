import type { Teacher } from "../../helpers/App.types";
import s from "./SearchBar.module.css";

interface Props {
  teachers: Teacher[];
  languageValue: string | null;
  levelValue: string | null;
  priceValue: number | null;
  onLanguageChange: (value: string | null) => void;
  onLevelChange: (value: string | null) => void;
  onPriceChange: (value: number | null) => void;
}

const getUniqueValues = <T,>(array: T[]): T[] => [...new Set(array)];

const SearchBar = ({
  teachers,
  languageValue,
  levelValue,
  priceValue,
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
        <select
          value={languageValue || ""}
          onChange={(e) => onLanguageChange(e.target.value || null)}
        >
          <option value="">All languages</option>
          {languageOptions.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <select
          value={levelValue || ""}
          onChange={(e) => onLevelChange(e.target.value || null)}
        >
          <option value="">All levels</option>
          {levelOptions.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <select
          value={priceValue?.toString() || ""}
          onChange={(e) => onPriceChange(Number(e.target.value) || null)}
        >
          <option value="">Any price</option>
          {priceOptions.map((price) => (
            <option key={price} value={price}>
              {`${price} $`}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};
export default SearchBar;
