"use client";
import {  logoutUser } from "@/libs/services";
import { ChildrenContext, ContextProjectTypes } from "@/types/global";
import { createContext, useContext, useEffect, useState } from "react";

const ContextProject = createContext<ContextProjectTypes | null>(null);

export const useContextProject = (): ContextProjectTypes => {
  const context = useContext(ContextProject);
  if (!context) throw new Error("Context inancanzable");
  return context;
};

export default function ProviderProject({ children }: ChildrenContext) {
  const [user, setUser] = useState("");

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);
    }
  }, [user]);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(localUser);
    }
  }, []);

  const login = async (newUser: string) => {
    setUser(newUser); 
  };

  const logout = async () => {
    await logoutUser(user); 
    setUser("");
    localStorage.removeItem("user");
  };

  return (
    <ContextProject.Provider
      value={{
        login,
        logout,
        user,
      }}>
      {children}
    </ContextProject.Provider>
  );
}
