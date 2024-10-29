import { PropsCardMain } from "@/types/components";
import "../styles/card-main.css";

export const CardMain = ({ children }: PropsCardMain): JSX.Element => {
  return <div className="card-main">{children}</div>;
};
