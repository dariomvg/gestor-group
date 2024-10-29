"use client";
import { objBase } from "@/utils/object-project";
import "./nuevo.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useContextProject } from "@/contexts/ContextProject";
import { useRouter } from "next/navigation";
import { useHandleProject } from "@/hooks/useHandleProject";
import { useFindProject } from "@/hooks/useFindProject";
import { PropsParams } from "@/types/pages";

export default function Nuevo({ params }: PropsParams): JSX.Element {
  const [form, setForm] = useState(objBase);
  const [msg, setMsg] = useState("");
  const { user } = useContextProject();
  const { addProject } = useHandleProject();
  const { project } = useFindProject(parseInt(params.id));
  const router = useRouter();

  useEffect(() => {
    if (project) {
      setForm(project);
    }
  }, [project]);

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password.length > 15 || form.password.length < 8) {
      setMsg("Contraseña debe ser de 8 a 15 caracteres");
      return;
    }
    if (form.title.length > 15) {
      setMsg("El título no puede superar los 15 caracteres");
      return;
    }
    addProject(form, user);
    setForm(objBase);
    setMsg("");
    router.push("/proyectos");
  };

  if (!user) {
    router.push("/registrarse");
  }

  return (
    <section className="section-nuevo">
      <form className="form-create" onSubmit={submitForm}>
        <h1 className="title-form">Crear nuevo proyecto</h1>
        {msg && <p className="msg-form">{msg}</p>}
        <div className="box-input">
          <label htmlFor="title" className="label-input">
            Nombre del proyecto
          </label>
          <input
            type="text"
            id="title"
            className="input-form"
            required
            name="title"
            value={form.title}
            onChange={changeInput}
          />
        </div>
        <div className="box-input">
          <label htmlFor="desc" className="label-input">
            Descripción del proyecto
          </label>
          <input
            type="text"
            id="desc"
            className="input-form"
            required
            name="description"
            value={form.description}
            onChange={changeInput}
          />
        </div>
        <div className="box-input">
          <label htmlFor="password" className="label-input">
            Contraseña del proyecto
          </label>
          <input
            type="password"
            id="password"
            className="input-form"
            required
            name="password"
            value={form.password}
            onChange={changeInput}
          />
        </div>
        <div className="section-input-dates">
          <div className="box-input">
            <label htmlFor="start_date" className="label-input">
              Inicio
            </label>
            <input
              type="date"
              id="start_date"
              className="input-form date"
              required
              name="start_date"
              value={form.start_date}
              onChange={changeInput}
            />
          </div>
          <div className="box-input">
            <label htmlFor="last_date" className="label-input">
              Término
            </label>
            <input
              type="date"
              id="last_date"
              className="input-form date"
              required
              name="last_date"
              value={form.last_date}
              onChange={changeInput}
            />
          </div>
        </div>
        <input
          type="submit"
          value={`${form.id ? "Actualizar" : "Crear"}`}
          className="input-submit"
        />
      </form>
    </section>
  );
}
