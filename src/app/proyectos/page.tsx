"use client";
import Link from "next/link";
import "./proyectos.css";
import { CardProject } from "@/components/CardProject";
import { useHandleProject } from "@/hooks/useHandleProject";
import { useContextProject } from "@/contexts/ContextProject";

export default function proyectos() {
  const { projects } = useHandleProject();
  const {user} = useContextProject(); 

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
