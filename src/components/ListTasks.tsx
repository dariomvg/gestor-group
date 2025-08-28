"use client";
import iconDelete from "../assets/icons/delete.svg";
import iconCloseList from "../assets/icons/closeList.svg";
import iconAddTask from "../assets/icons/icon-more.svg";
import React, { useEffect, useState } from "react";
import "../styles/list-tasks.css";
import { CreateTask } from "./CreateTask";
import { addNewTask, getTasks, removeTask } from "@/libs/lib_tasks";

interface PropsListTasks {
  open: boolean;
  handleOpenList: () => void;
}

function ListTasks({ open, handleOpenList }: PropsListTasks) {
  const [viewCreate, setViewCreate] = useState(false);
  const [viewDelete, setViewDelete] = useState(false);
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask: string) => {
    addNewTask(newTask); // arreglar despues
  };

  useEffect(() => {
    const getAllTasks = async () => {
      const newTasks = await getTasks(); // arreglar despues
      if (newTasks) setTasks(newTasks);
    };
    getAllTasks();
  }, []);

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
        loading="lazy"
        className="close-list"
        onClick={handleOpenList}
        title="cerrar lista"
      />
      {tasks.length > 0 ? (
        <section className="section-tasks">
          <div className="header-tasks">
            <h3 className="title-header-tasks">Tareas pendientes</h3>
            <div className="btns-header-tasks">
              <img
                src={iconAddTask.src}
                alt="show add tasks"
                width={25}
                height={25}
                loading="lazy"
                className="icon-header-tasks"
                onClick={() => setViewCreate(!viewCreate)}
              />
              <img
                src={iconDelete.src}
                alt="show delete tasks"
                width={25}
                height={25}
                loading="lazy"
                className="icon-header-tasks"
                onClick={() => setViewDelete(!viewDelete)}
              />
            </div>
          </div>
          <ul className="list-tasks">
            {tasks.map((item) => (
              <li className="task" key={item.id}>
                <p className="title-task">{item.task}</p>
                {viewDelete && (
                  <img
                    src={iconDelete.src}
                    alt="delete task"
                    width={20}
                    height={20}
                    loading="lazy"
                    className="icon-delete"
                    onClick={() => removeTask(item.id)}
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
}

export default React.memo(ListTasks);
