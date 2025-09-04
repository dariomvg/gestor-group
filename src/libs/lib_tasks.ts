import { supabase } from "@/supabase/supabase";

export const getTasks = async (projectId: number) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", projectId);
  if (error) {
    console.log(error);
    throw new Error("Error Getting tasks");
  }
  return data;
};

export const removeTask = async (idTask: number) => {
  const { data, error } = await supabase.from("tasks").delete().eq("id", idTask).select();
  if (error) {
    console.log(error);
    throw new Error("Error Removing task");
  }

  return data[0];
};

export const addNewTask = async (newTask: {
  task: string;
  project_id: number;
  completed: boolean;
}) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert([newTask])
    .select();
  if (error) {
    console.log(error);
    throw new Error("Error Adding task");
  }

  return data[0];
};

export const completeTask = async (value: boolean, idTask: number) => {
  const { data, error } = await supabase
    .from("tasks")
    .update({ completed: value })
    .eq("id", idTask)
    .select()
  if (error) {
    console.log(error);
    throw new Error("Error Adding task");
  }

  return data[0];
};
