import { supabase } from "@/supabase/supabase";

export const addNewMessage = async (newMsg: {
  username: string;
  project_id: number;
  date_msg: string;
  message: string;
}) => {
  const { data, error } = await supabase
    .from("messages")
    .insert([newMsg])
    .select();
  if (error) {
    console.log(error);
    throw new Error("Error Adding message");
  }

  return data[0];
};

export const getMessages = async (id: number) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("project_id", id);
  if (error) {
    console.log(error);
    throw new Error("Error Getting task");
  }
  return data;
};

export const deleteMessage = async (idMessage: number) => {
  const { data, error } = await supabase
    .from("messages")
    .delete()
    .eq("id", idMessage)
    .select();
  if (error) {
    console.log(error);
    throw new Error("Error Removing message");
  }
  return data[0];
};
