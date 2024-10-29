"use client";
import "../styles/list-tasks.css";
import iconDelete from "../assets/icons/delete.svg";
import iconCloseList from "../assets/icons/closeList.svg";
import iconAddTask from "../assets/icons/icon-more.svg";
import { FormEvent, useState } from "react";
import { PropsCreateTask, PropsListTasks } from "@/types/components";

const CreateTask = ({ setViewCreate, addTask }: PropsCreateTask): JSX.Element => {
  const [form, setForm] = useState("");

  const submitTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    addTask(form);
    setForm(""); 
    setViewCreate(false);
  }

  return (
    <div className="box-create-task">
      <button className="close-box-create" onClick={() => setViewCreate(false)}>
        X
      </button>
      <form className="form-task" onSubmit={submitTask}>
        <input
          type="text"
          className="input-form-task"
          placeholder="Escribe tu tarea"
          id="task"
          name="task"
          value={form}
          onChange={(e) => setForm(e.target.value)}
          required
        />
        <button type="submit" className="btn-form-task">Añadir</button>
      </form>
    </div>
  );
};

export const ListTasks = ({ open, handleOpenList, project, addTask, deleteTask }: PropsListTasks): JSX.Element => {
  const [viewCreate, setViewCreate] = useState(false);
  const [viewDelete, setViewDelete] = useState(false);

  return (
    <section className={`section-list-tasks ${open ? "openList" : ""}`}>
      <div className={`sec-create-task ${viewCreate ? "openCreate" : ""}`}>
        <CreateTask setViewCreate={setViewCreate} addTask={addTask} />
      </div>
      <img
        src={iconCloseList.src}
        alt="close list tasks"
        width={30}
        height={30}
        className="close-list"
        onClick={handleOpenList}
        title="cerrar lista"
      />
      {project.tasks.length > 0 ? (
        <section className="section-tasks">
          <div className="header-tasks">
            <h3 className="title-header-tasks">Tareas pendientes</h3>
            <div className="btns-header-tasks">
              <img
                src={iconAddTask.src}
                alt="show add tasks"
                width={25}
                height={25}
                className="icon-header-tasks"
                onClick={() => setViewCreate(!viewCreate)}
              />
              <img
                src={iconDelete.src}
                alt="show delete tasks"
                width={25}
                height={25}
                className="icon-header-tasks"
                onClick={() => setViewDelete(!viewDelete)}
              />
            </div>
          </div>
          <ul className="list-tasks">
            {project.tasks.map((item) => (
              <li className="task" key={item.id}>
                <input type="checkbox" name="" id="" />
                <p className="title-task">{item.task}</p>
                {viewDelete && (
                  <img
                    src={iconDelete.src}
                    alt="delete task"
                    width={20}
                    height={20}
                    className="icon-delete"
                    onClick={() => deleteTask(item.id)}
                  />
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <div className="section-create-task">
          <p className="title-create-task">No tienes tareas pendientes</p>
          <button
            className="btn-create-task"
            onClick={() => setViewCreate(!viewCreate)}>
            Crear
          </button>
        </div>
      )}
    </section>
  );
};
