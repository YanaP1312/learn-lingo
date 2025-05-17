import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { CiLogin } from "react-icons/ci";
import s from "./AuthNav.module.css";

export default function AuthNav() {
  const [modal, setModal] = useState<"login" | "register" | null>(null);
  return (
    <div className={s.wrap}>
      <button className="logBtn" onClick={() => setModal("login")}>
        <CiLogin className="logIcon" />
        Log in
      </button>
      <button className={s.btnReg} onClick={() => setModal("register")}>
        Registration
      </button>
      {modal === "login" && <LoginModal onClose={() => setModal(null)} />}
      {modal === "register" && <RegisterModal onClose={() => setModal(null)} />}
    </div>
  );
}
