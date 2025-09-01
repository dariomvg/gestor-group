"use client";
import { objBase } from "@/utils/object-project";
import "./nuevo.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/ContextAuth";
import { addNewProject, getProject, updateProject } from "@/libs/lib_projects";

export default function Nuevo({ params }: {params: {id: string}}) {
  const { id } = params;
  const [form, setForm] = useState(objBase);
  const [msg, setMsg] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const getEditProject = async () => {
        const newProject = await getProject(parseInt(id));
        if (newProject.length > 0) {
          setForm(newProject[0]);
        }
      };
      getEditProject();
    }
  }, [id]);

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const titleProject = form.password.length;
    const passwordProject = form.password.length;
    if (passwordProject > 15 || passwordProject < 8) {
      setMsg("Contraseña debe ser de 8 a 15 caracteres");
      return;
    }
    if (titleProject > 15) {
      setMsg("El título no debe superar los 15 caracteres");
      return;
    }

    if (form.id) {
      updateProject(form);
    } else {
      addNewProject({ ...form, creator: user.username, user_id: user.user_id });
    }

    setForm(objBase);
    setMsg("");
    router.push("/proyectos");
  };

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
            <label htmlFor="end_date" className="label-input">
              Término
            </label>
            <input
              type="date"
              id="end_date"
              className="input-form date"
              required
              name="end_date"
              value={form.end_date}
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
