import { supabase } from "@/supabase/supabase";

export const getSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};

export const logout = async () => {
  let { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    throw new Error("Error LogOut of Google in the Application");
  }
};

export const login = async () => {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.log(error);
    throw new Error("Error Login with Google");
  }
  console.log(data);
};
