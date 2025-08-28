"use client";
import { ContextAuthTypes, ObjUser } from "@/types/global";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const ContextAuth = createContext<ContextAuthTypes | null>(null);

export const useAuth = (): ContextAuthTypes => {
  const context = useContext(ContextAuth);
  if (!context) throw new Error("Context inancanzable");
  return context;
};

export default function ProviderAuth({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ObjUser | null>(null);

  return (
    <ContextAuth.Provider value={{ user }}>{children}</ContextAuth.Provider>
  );
}
