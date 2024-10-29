"use client";
import { FormEvent, useState } from "react";
import "../styles/verify-pass.css";
import { getColaborate, verifyPassword } from "@/libs/services";

export const VerifyPassword = ({movePassword, id}): JSX.Element => {

  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");


  const submitFormPass = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pass.length > 15 || pass.length < 8) {
      setMsg("Contraseña debe ser de 8 a 15 caracteres");
      return;
    }

    const verify = await verifyPassword(id, pass); 
  
    if(!verify) {
      setMsg("Contraseña es incorrecta")
      return; 
    } 
    movePassword(verify); 

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
          type="text"
          className="input-form-pass"
          id="pass"
          name="pass"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <button type="submit" className="btn-form-pass">
          Ingresar
        </button>
      </form>
    </section>
  );
};
