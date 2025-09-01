import { supabase } from "@/supabase/supabase";

export const saveContentEditor = async (
  newContent: string,
  idProject: number
) => {
  const { data, error } = await supabase
    .from("projects")
    .update({ content: newContent })
    .eq("id", idProject)
    .select();
  if (error) {
    console.log(error);
    throw new Error("Error Removing projects");
  }
};
