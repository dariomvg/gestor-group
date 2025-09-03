"use client";
import { login } from "@/libs/lib_auth";
import "./register.css";

export default function Registrarse() {
  return (
    <main className="main-register">
      <button className="button-register" onClick={login}>
        Iniciar sesión
      </button>
    </main>
  );
}
