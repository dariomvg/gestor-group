"use client";
import React, { FormEvent, useRef, useState } from "react";
import "../styles/verify-pass.css";
import { verifyCorrectPassword } from "@/libs/lib_password";

interface PropsVerify {
  accessUser: () => void;
}

function VerifyPassword({ accessUser }: PropsVerify) {
  const [msg, setMsg] = useState("");
  const refPass = useRef<HTMLInputElement>(null);

  const submitFormPass = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pass = refPass.current.value;
    if (pass.length > 15 || pass.length < 8) {
      setMsg("Contraseña debe ser de 8 a 15 caracteres");
      return;
    }

    const verify = await verifyCorrectPassword(pass);

    if (!verify) {
      setMsg("Contraseña es incorrecta");
      return;
    }
    accessUser();
  };

  return (
    <section className="wrapper-form-pass">
      <form className="form-verify-pass" onSubmit={submitFormPass}>
        {msg && <p className="msg-form-pass">{msg}</p>}
        <h1 className="title-form-pass">Verificador de ingreso</h1>
        <label htmlFor="pass" className="label-form-pass">
          Ingresar contraseña
        </label>
        <input
          type="password"
          className="input-form-pass"
          id="pass"
          name="pass"
          ref={refPass}
          required
        />
        <button type="submit" className="btn-form-pass">
          Ingresar
        </button>
      </form>
    </section>
  );
}

export default React.memo(VerifyPassword);
