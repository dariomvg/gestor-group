import Link from "next/link";
import "@/styles/card-project.css";
import { ObjBaseType } from "@/types/global";

export const CardProject = ({ item }: {item: ObjBaseType}) => {
  const { start_date, end_date, title, description, id } = item;
  return (
    <div className="card-project">
      <div className="box-dates">
        <p className="date-box">{start_date}</p>
        <p className="date-box">{end_date}</p>
      </div>
      <hr className="line-card" />
      <h3 className="title-card-project">{title}</h3>
      <p className="description-card-project">{description}</p>
      <div className="box-links">
        <div className="box-buttons">
          <Link className="button-card" href={`/nuevo/${id}`}>
            Editar
          </Link>
          <Link href={`/proyectos/${id}`} className="link-card">
            Visitar
          </Link>
        </div>
      </div>
    </div>
  );
};
