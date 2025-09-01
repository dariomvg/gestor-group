"use client";
import { getSession } from "@/libs/lib_auth";
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
  if (!context) throw new Error("Context inalcanzable");
  return context;
};

export default function ProviderAuth({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ObjUser | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const session = await getSession();
      if (session) {
        setUser({
          user_id: session.user.id,
          picture: session.user.user_metadata.avatar_url,
          username:
            session.user.user_metadata.full_name ||
            session.user.user_metadata.name ||
            "",
        });
      }
    };
    getUser();
  }, []);

  return (
    <ContextAuth.Provider value={{ user }}>{children}</ContextAuth.Provider>
  );
}
