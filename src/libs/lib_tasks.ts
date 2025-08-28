import { supabase } from "@/supabase/supabase";
import { TaskType } from "@/types/global";


export const updateTasks = async (tasks: TaskType[], id: number) => {
  const { data, error } = await supabase
    .from("projects")
    .update({ tasks })
    .eq("id", id)
    .select();
  if (error) return console.log(error);
};


export const getTasks = async () => {
  return [];
};

export const removeTask = async (id: number) => {};

export const addNewTask = async (newTask:string) => {};
