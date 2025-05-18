import { useState } from "react";
import { PiEyeSlashThin, PiEyeThin } from "react-icons/pi";
import s from "./PasswordInput.module.css";
import type { UseFormRegisterReturn } from "react-hook-form";

interface PasswordInputProps {
  registration: UseFormRegisterReturn;
  error?: string;
  placeholder?: string;
}

const PasswordInput = ({
  registration,
  error,
  placeholder = "Password",
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  return (
    <div>
      <div className={s.wrap}>
        <input
          type={showPassword ? "text" : "password"}
          {...registration}
          placeholder={placeholder}
          className={s.input}
        />
        <span onClick={togglePassword} className={s.iconPsw}>
          {showPassword ? <PiEyeThin /> : <PiEyeSlashThin />}
        </span>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default PasswordInput;
