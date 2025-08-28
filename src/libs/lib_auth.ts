import { supabase } from "@/supabase/supabase";


export const getSession = async (user: string) => {
  let { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user", user);

  return data[0];
};


export const logout = async () => {
  const { error } = await supabase.from("users").delete().eq("user", "cambiar despues");
  if (error) return console.log(error);
};

export const login = async () => {
  const foundUser = await getSession("dario");
  if (foundUser) {
    return "";
  }
  const { data, error } = await supabase
    .from("users")
    .insert([{ user: "cambiar despues" }])
    .select();

  if (error) return console.log(error);
  console.log("data: ", data);
  return data[0].user;
};