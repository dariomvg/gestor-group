"use client";
import iconDelete from "../assets/icons/delete.svg";
import iconCloseList from "../assets/icons/closeList.svg";
import React, { useEffect, useState } from "react";
import "../styles/list-tasks.css";
import { CreateTask } from "./CreateTask";
import { addNewTask, getTasks, removeTask } from "@/libs/lib_tasks";

interface PropsListTasks {
  open: boolean;
  handleOpenList: () => void;
  id: number;
}

function ListTasks({ open, handleOpenList, id }: PropsListTasks) {
  const [tasks, setTasks] = useState([]);

  const addTask = async (newTask: string) => {
    const data = await addNewTask({
      task: newTask,
      project_id: id,
      completed: false,
    });
    if (data.length > 0) setTasks([...tasks, data[0]]);
  };

  useEffect(() => {
    const getAllTasks = async () => {
      const newTasks = await getTasks();
      if (newTasks.length > 0) setTasks(newTasks);
    };
    getAllTasks();
  }, []);

  return (
    <section className={`section-list-tasks ${open ? "openList" : ""}`}>
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
      <div className={`sec-create-task`}>
        <CreateTask addTask={addTask} />
      </div>
      {tasks.length > 0 ? (
        <section className="section-tasks">
          <h3 className="title-header-tasks">Tareas pendientes</h3>
          <ul className="list-tasks">
            {tasks.map((item) => (
              <li className="task" key={item.id}>
                <p className="title-task">{item.task}</p>
                <img
                  src={iconDelete.src}
                  alt="delete task"
                  width={20}
                  height={20}
                  loading="lazy"
                  className="icon-delete"
                  onClick={() => removeTask(item.id)}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <div className="section-create-task">
          <p className="title-create-task">No tienes tareas pendientes</p>
        </div>
      )}
    </section>
  );
}

export default React.memo(ListTasks);
