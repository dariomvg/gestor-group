import { supabase } from "@/supabase/supabase";


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