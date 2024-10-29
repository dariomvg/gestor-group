import { supabase } from "@/supabase/supabase";
import { ObjBaseType, TaskType } from "@/types/global";

// todo handle projects

export const getProjects = async (): Promise<ObjBaseType[]> => {
  let { data, error } = await supabase.from("projects").select("*");
  return data;
};

export const getProject = async (id: number): Promise<ObjBaseType[]> => {
  const { data } = await supabase.from("projects").select("*").eq("id", id);
  return data;
};

export const addNewProject = async (project: ObjBaseType, user: string) => {
  const { data, error } = await supabase
    .from("projects")
    .insert([{ ...project, creator: user }])
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
  if(error) console.log(error);
};


// todo about tasks

export const updateTasks = async (tasks: TaskType[], id: number) => {
  const { data, error } = await supabase
    .from("projects")
    .update({ tasks })
    .eq("id", id)
    .select();
  if (error) return console.log(error);
};

// todo about password

export const updateNewPassword = async (pass: string, id: number) => {
  const { data, error } = await supabase
    .from("projects")
    .update({ password: pass })
    .eq("id", id)
    .select();
  if (error) return console.log(error);
};

// todo colaborates

export const getColaborate = async (name: string) => {
  let { data, error } = await supabase
    .from("colaborators")
    .select("*")
    .eq("name", name);
  if (error) return console.log(error);
  return data[0];
};

export const getAllColaborates = async (id: number) => {
  let { data, error } = await supabase
    .from("colaborators")
    .select("name")
    .eq("colab_id", id);
  if (error) console.log(error);
  return data;
};

export const deleteColaborate = async (name: string) => {
  const { error } = await supabase
    .from("colaborators")
    .delete()
    .eq("name", name);
  if (error) console.log(error);
};

export const addColaborate = async (idProject: number, colaborate: string) => {
  console.log(idProject, colaborate);
  const { data, error } = await supabase
    .from("colaborators")
    .insert([{ colab_id: idProject, name: colaborate }])
    .select();
  if (error) console.log(error);
  return data[0];
};

// todo verify password project

export const verifyPassword = async (id: number, pass: string) => {
  const project = await getProject(id);
  if (project[0].password === pass) {
    return true;
  }
  return false;
};

export const getUser = async (user: string) => {
  let { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user", user);

  return data[0];
};

// todo login/logout app

export const logoutUser = async (user: string) => {
  const { error } = await supabase.from("users").delete().eq("user", user);
  if (error) return console.log(error);
};

export const loginUser = async (user: string) => {
  const foundUser = await getUser(user);
  if (foundUser) {
    return "";
  }
  const { data, error } = await supabase
    .from("users")
    .insert([{ user: user }])
    .select();

  if (error) return console.log(error);
  console.log("data: ", data);
  return data[0].user;
};

// todo save data text-editor project

export const saveContentEditor = async (content: string, id: number) => {
  const { data, error } = await supabase
    .from("projects")
    .update({ content })
    .eq("id", id)
    .select();
  if (error) return console.log(error);
};


export const addNewMessage = async (msg: string, id: number, user: string) => {
  const { data, error } = await supabase
    .from("chat")
    .insert([{ project_id: id, message: msg, username: user }])
    .select();
  return data[0];
};

export const getAllMessages = async (id: number) => {
  let { data, error } = await supabase.from("chat").select("username, message");

  if (error) console.log(error);
  return data;
};
