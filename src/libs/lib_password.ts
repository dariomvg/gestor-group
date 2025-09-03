import { supabase } from "@/supabase/supabase";

export const updatePassword = async (
  newPassword: string,
  idProject: number
) => {
  const { data, error } = await supabase
    .from("projects")
    .update({ password: newPassword })
    .eq("id", idProject)
    .select("password");
  if (error) {
    console.log(error);
    throw new Error("Error update password");
  }
  console.log(data);
  return data[0].password;
};

export const verifyCorrectPassword = async (password: string) => {
  let { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("password", password);

  if (error) {
    console.log(error);
    throw new Error("Error Verify Password");
  }

  return data.length > 0 ? true : false;
};
