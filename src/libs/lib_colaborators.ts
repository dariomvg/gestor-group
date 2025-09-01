import { supabase } from "@/supabase/supabase";

export const getColaborate = async (idColaborator: number) => {
  let { data, error } = await supabase
    .from("colaborators")
    .select("*")
    .eq("user_id", idColaborator);
  if (error) {
    console.log(error);
    throw new Error("Error Getting on colaborator");
  }
  return data[0];
};

export const getCollaborators = async (idProject: number) => {
  let { data, error } = await supabase
    .from("colaborators")
    .select("*")
    .eq("project_id", idProject);
  if (error) {
    console.log(error);
    throw new Error("Error Getting colaborators");
  }
  return data;
};

export const deleteColaborate = async (idColaborator: number) => {
  const { error } = await supabase
    .from("colaborators")
    .delete()
    .eq("id", idColaborator);
  if (error) {
    console.log(error);
    throw new Error("Error Removing colaborators");
  }
};

export const addColaborate = async (colaborate: {
  username: string;
  project_id: number;
  user_id: string;
}) => {
  const { data, error } = await supabase
    .from("colaborators")
    .insert([colaborate])
    .select();
  if (error) {
    console.log(error);
    throw new Error("Error Adding colaborator");
  }
  return data[0];
};
