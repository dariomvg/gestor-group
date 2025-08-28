import { supabase } from "@/supabase/supabase";


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