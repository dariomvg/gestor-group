"use client";
import iconDelete from "../assets/icons/delete.svg";
import iconCloseList from "../assets/icons/closeList.svg";
import iconCheckTask from "../assets/icons/check-task.svg";
import React, { useEffect, useState } from "react";
import "../styles/list-tasks.css";
import { CreateTask } from "./CreateTask";
import {
  addNewTask,
  completeTask,
  getTasks,
  removeTask,
} from "@/libs/lib_tasks";

interface PropsListTasks {
  open: boolean;
  handleOpenList: () => void;
  id: number;
}

function ListTasks({ open, handleOpenList, id }: PropsListTasks) {
  const [tasks, setTasks] = useState([]);

  const getAllTasks = async () => {
    const newTasks = await getTasks(id);
    if (newTasks.length > 0) setTasks(newTasks);
  };

  const deleteTask = async (idTask: number) => {
    const taskRemoved = await removeTask(idTask);
    if (taskRemoved) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== idTask));
    }
  };

  const completingTask = async (value: boolean, idTask: number) => {
    const taskCompleted = await completeTask(value, idTask);
    if (taskCompleted) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === idTask ? { ...task, completed: value } : task
        )
      );
    }
  };

  const addTask = async (newTask: string) => {
    const taskAdded = await addNewTask({
      task: newTask,
      project_id: id,
      completed: false,
    });

    if (taskAdded) {
      setTasks((prevTasks) => [...prevTasks, taskAdded]);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [id]);

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
              <li
                className={`task ${item.completed ? "completed-task" : ""}`}
                key={item.id}>
                <p className="title-task">{item.task}</p>

                <div className="container-controls-task">
                  <img
                    src={iconCheckTask.src}
                    alt="check task"
                    title="Completada"
                    width={20}
                    height={20}
                    loading="lazy"
                    className="icon-controls-task"
                    onClick={() => completingTask(!item.completed, item.id)}
                  />
                  <img
                    src={iconDelete.src}
                    alt="delete task"
                    title="Eliminar"
                    width={20}
                    height={20}
                    loading="lazy"
                    className="icon-controls-task"
                    onClick={() => deleteTask(item.id)}
                  />
                </div>
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
