import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { setTheme } from "../../redux/theme/slice";
import { themes, type ThemeName } from "../../helpers/themes";
import s from "./ThemeSelector.module.css";

const ThemeSelector = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleSelect = (theme: ThemeName) => {
    dispatch(setTheme(theme));
    setOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} className={s.btn}>
        Theme
      </button>
      {open && (
        <ul className={s.list}>
          {Object.entries(themes).map(([name, t]) => (
            <li key={name}>
              <button
                onClick={() => handleSelect(name as ThemeName)}
                className={s.themeBtn}
                style={
                  {
                    color: t.accentColor,
                    "--hover-color": t.color,
                  } as React.CSSProperties
                }
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
