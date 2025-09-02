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
import { supabase } from "@/supabase/supabase";

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

  const addTask = async (newTask: string) => {
    addNewTask({
      task: newTask,
      project_id: id,
      completed: false,
    });
  };

  useEffect(() => {
    getAllTasks();

    const channel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setTasks((prevTasks) => [...prevTasks, payload.new]);
          }
          if (payload.eventType === "DELETE") {
            setTasks((prevTasks) =>
              prevTasks.filter((task) => task.id !== payload.old.id)
            );
          }
          if (payload.eventType === "UPDATE") {
            const newTask = payload.new;
            setTasks((prevTasks) =>
              prevTasks.map((task) =>
                task.id == newTask.id
                  ? { ...task, completed: newTask.completed }
                  : task
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
                    onClick={() => completeTask(!item.completed, item.id)}
                  />
                  <img
                    src={iconDelete.src}
                    alt="delete task"
                    title="Eliminar"
                    width={20}
                    height={20}
                    loading="lazy"
                    className="icon-controls-task"
                    onClick={() => removeTask(item.id)}
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
