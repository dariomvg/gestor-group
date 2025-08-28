import { supabase } from "@/supabase/supabase";

export const saveContentEditor = async (content: string, id: number) => {
  const { data, error } = await supabase
    .from("projects")
    .update({ content })
    .eq("id", id)
    .select();
  if (error) return console.log(error);
};


