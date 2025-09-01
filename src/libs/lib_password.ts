import { supabase } from "@/supabase/supabase";

export const updatePassword = async (
  newPassword: string,
  idProject: number
) => {
  const { data, error } = await supabase
    .from("projects")
    .update({ password: newPassword })
    .eq("id", idProject)
    .select();
  if (error) {
    console.log(error);
    throw new Error("Error update password");
  }
  console.log(data);
};

export const verifyCorrectPassword = async (password: string) => {
  let { data, error } = await supabase
    .from("projects")
    .select("password")
    .eq("password", password);

  if (error) {
    console.log(error);
    throw new Error("Error Verify Password");
  }

  return data ? true : false;
};
