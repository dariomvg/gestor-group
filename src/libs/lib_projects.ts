import { supabase } from "@/supabase/supabase";
import { ObjBaseType } from "@/types/global";

export const getProjects = async (): Promise<ObjBaseType[]> => {
  let { data, error } = await supabase.from("projects").select("*");
  return data;
};

export const getProject = async (id: number): Promise<ObjBaseType[]> => {
  const { data } = await supabase.from("projects").select("*").eq("id", id);
  return data;
};

export const addNewProject = async (project: ObjBaseType) => {
  const { data, error } = await supabase
    .from("projects")
    .insert([project])
    .select();
};

export const updateProject = async (project: ObjBaseType) => {
  const { data, error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", project.id)
    .select();
};

export const removeProject = async (id: number) => {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) console.log(error);
};
