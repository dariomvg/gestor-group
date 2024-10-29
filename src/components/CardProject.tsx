import Link from "next/link";
import "@/styles/card-project.css";
import { PropsCardProject } from "@/types/components";

export const CardProject = ({ item }: PropsCardProject): JSX.Element => {

  return (
    <div className="card-project">
      <div className="box-dates">
        <p className="date-box">{item.start_date}</p>
        <p className="date-box">{item.last_date}</p>
      </div>
      <hr className="line-card" />
      <h3 className="title-card-project">{item.title}</h3>
      <p className="description-card-project">{item.description}</p>
      <div className="box-links">
        <div className="box-buttons">
          <Link
            className="button-card"
            href={`/nuevo/${item.id}`}
            >
            Editar
          </Link>
           <Link href={`/proyectos/${item.id}`} className="link-card">
          Visitar
        </Link>
        </div>
       
      </div>
    </div>
  );
};
