import type { Teacher } from "../../helpers/App.types";
import s from "./SearchBar.module.css";
import Select from "react-select";

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
  const languageOptions = getUniqueValues(teachers.flatMap((t) => t.languages))
    .sort()
    .map((lang) => ({ value: lang, label: lang }));

  const levelOptions = getUniqueValues(teachers.flatMap((t) => t.levels))
    .sort()
    .map((level) => ({ value: level, label: level }));

  const priceOptions = getUniqueValues(
    teachers.map((t) => t.price_per_hour).sort((a, b) => a - b)
  ).map((price) => ({
    value: price,
    label: `${price} $`,
  }));

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      padding: "2px 0",
      borderRadius: "8px",
      borderColor: state.isFocused ? "var(--accentColor)" : "var(--grey)",
      boxShadow: "none",
      backgroundColor: "transparent",
      color: "var(--text-color)",
      fontSize: "14px",
      "&:hover": {
        borderColor: "var(--accentColor)",
      },
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: "var(--background-color)",
      border: "1px solid var(--accentColor)",
      zIndex: 20,
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused
        ? "var(--themeColor)"
        : state.isSelected
        ? "var(--accentColor)"
        : "transparent",
      color: "#333",
      cursor: "pointer",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: "var(--grey)",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "var(--text-color)",
    }),
  };

  return (
    <section>
      <div className={s.filterBox}>
        <div className={s.filterGroup}>
          <label>Languages</label>
          <Select
            options={languageOptions}
            value={
              languageValue
                ? { value: languageValue, label: languageValue }
                : null
            }
            onChange={(opt) => onLanguageChange(opt?.value || null)}
            placeholder="All languages"
            isClearable
            styles={customStyles}
          />
        </div>
        <div className={s.filterGroup}>
          <label>Level of knowledge</label>
          <Select
            options={levelOptions}
            value={levelValue ? { value: levelValue, label: levelValue } : null}
            onChange={(opt) => onLevelChange(opt?.value || null)}
            placeholder="All levels"
            isClearable
            styles={customStyles}
          />
        </div>
        <div className={s.filterGroup}>
          <label>Price</label>
          <Select
            options={priceOptions}
            value={
              priceValue != null
                ? { value: priceValue, label: `${priceValue} $` }
                : null
            }
            onChange={(opt) => onPriceChange(opt?.value || null)}
            placeholder="Any price"
            isClearable
            styles={customStyles}
          />
        </div>
      </div>
    </section>
  );
};
export default SearchBar;
