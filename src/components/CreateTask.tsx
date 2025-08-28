import { FormEvent, useRef } from "react";
import "@/styles/list-tasks.css";

interface PropsCreateTask {
  setViewCreate: (value: boolean) => void;
  addTask: (form: string) => void;
}

export const CreateTask = ({ setViewCreate, addTask }: PropsCreateTask) => {
  const refTask = useRef<HTMLInputElement>(null);

  const submitTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!refTask.current.value) return;
    addTask(refTask.current.value);
    refTask.current.value = "";
    setViewCreate(false);
  };

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
          required
          ref={refTask}
        />
        <button type="submit" className="btn-form-task">
          Añadir
        </button>
      </form>
    </div>
  );
};
