"use client";
import { useContextProject } from "@/contexts/ContextProject";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import "./login.css";
import { loginUser } from "@/libs/services";

export default function Register(): JSX.Element {
  const [form, setForm] = useState<string>("");
  const [msg, setMsg] = useState("");
  const { login } = useContextProject();
  const router = useRouter();

  const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const foundUser = await loginUser(form);
    if (foundUser) {
      login(foundUser);
      router.push("/");
    } else {
      setMsg("Nombre de usuario ya agregado");
      return;
    }
    setForm("");
  };

  return (
    <section className="section-login">
      <div className="form-box">
        <form className="form" onSubmit={submitLogin}>
          <span className="title">Registrarse</span>
          {msg && <p className="msg-register">{msg}</p>}
          <span className="subtitle">Crea tu usuario</span>
          <div className="form-container">
            <input
              type="text"
              className="input"
              placeholder="Nombre de usuario"
              name="username"
              value={form}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setForm(e.target.value)
              }
            />
          </div>
          <button type="submit" className="button-login">
            Guardar
          </button>
        </form>
      </div>
    </section>
  );
}
