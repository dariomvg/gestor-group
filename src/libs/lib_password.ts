import { supabase } from "@/supabase/supabase";
import { getProject } from "./lib_projects";


export const updateNewPassword = async (pass: string, id: number) => {
  const { data, error } = await supabase
    .from("projects")
    .update({ password: pass })
    .eq("id", id)
    .select();
  if (error) return console.log(error);
};

// todo colaborates



// todo verify password project

export const verifyPassword = async (id: number, pass: string) => {
  const project = await getProject(id);
  if (project[0].password === pass) {
    return true;
  }
  return false;
};