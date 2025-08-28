import Link from "next/link";
import "./proyectos.css";
import { CardProject } from "@/components/CardProject";
import { getProjects } from "@/libs/lib_projects";

export default async function Proyectos() {
  const projects = await getProjects();

  return (
    <section className="page-projects">
      {projects.length > 0 ? (
        <section className="section-projects">
          {projects.map((item) => (
            <CardProject key={item.id} item={item} />
          ))}
        </section>
      ) : (
        <div className="section-create">
          <p className="title-create">No tienes proyectos creados</p>
          <Link href="/nuevo" className="link-create">
            Crear proyecto
          </Link>
        </div>
      )}
    </section>
  );
}
