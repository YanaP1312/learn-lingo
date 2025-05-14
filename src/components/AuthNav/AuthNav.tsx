import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

export default function AuthNav() {
  const [modal, setModal] = useState<"login" | "register" | null>(null);
  return (
    <div>
      <button onClick={() => setModal("login")}>
        <svg width="20" height="20">
          <use href="/sprite.svg#icon-log-in" />
        </svg>
        Log in
      </button>
      <button onClick={() => setModal("register")}>Registration</button>
      {modal === "login" && <LoginModal onClose={() => setModal(null)} />}
      {modal === "register" && <RegisterModal onClose={() => setModal(null)} />}
    </div>
  );
}
