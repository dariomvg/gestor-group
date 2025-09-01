import { supabase } from "@/supabase/supabase";
import { ObjBaseType } from "@/types/global";

export const getProjects = async (): Promise<ObjBaseType[]> => {
  
let { data: projects, error } = await supabase
  .from('projects')
  .select('*')
          
  if (error) {
    console.log(error);
    throw new Error("Error Getting projects");
  }
  return projects;
};

export const getProject = async (idProject: number): Promise<ObjBaseType[]> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", idProject);

  if (error) {
    console.log(error);
    throw new Error("Error Getting one project");
  }
  return data;
};

export const addNewProject = async (newProject: ObjBaseType) => {
  const { data, error } = await supabase
    .from("projects")
    .insert([newProject])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Error Adding new project");
  }

  console.log(data);
};

export const updateProject = async (project: ObjBaseType) => {
  const { data, error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", project.id)
    .select();

  if (error) {
    console.log(error);
    throw new Error("Error Updating project");
  }

  console.log(data);
};

export const removeProject = async (idProject: number) => {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", idProject);
  if (error) {
    console.log(error);
    throw new Error("Error Removing projects");
  }
};
