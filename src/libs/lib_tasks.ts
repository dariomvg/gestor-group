import { supabase } from "@/supabase/supabase";

export const getTasks = async () => {
  const { data, error } = await supabase.from("tasks").select("*");
  if (error) {
    console.log(error);
    throw new Error("Error Getting tasks");
  }
  return data;
};

export const removeTask = async (idTask: number) => {
  const { error } = await supabase.from("tasks").delete().eq("id", idTask);
  if (error) {
    console.log(error);
    throw new Error("Error Removing task");
  }
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
  console.log(data);
  return data;
};
