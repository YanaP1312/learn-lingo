import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { selectTheme, setTheme } from "../../redux/theme/slice";
import { themes, type ThemeName } from "../../helpers/themes";

const ThemeSelector = () => {
  const current = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleSelect = (theme: ThemeName) => {
    dispatch(setTheme(theme));
    setOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "transparent",
          color: themes[current].accentColor,
          border: `1px solid ${themes[current].accentColor}`,
          borderRadius: "6px",
          padding: "6px 12px",
        }}
      >
        Theme
      </button>
      {open && (
        <ul
          style={{
            position: "absolute",
            top: "110%",
            left: 0,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: 8,
            zIndex: 100,
            listStyle: "none",
          }}
        >
          {Object.entries(themes).map(([name, t]) => (
            <li key={name}>
              <button
                onClick={() => handleSelect(name as ThemeName)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: t.accentColor,
                  cursor: "pointer",
                  padding: "6px 10px",
                }}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemeSelector;
