import "../styles/card-home.css";
import { ReactNode } from "react";

export const CardHome = ({ children }: {children: ReactNode}) => {
  return <div className="card-main">{children}</div>;
};
