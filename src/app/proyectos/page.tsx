"use client";
import Link from "next/link";
import "./proyectos.css";
import { CardProject } from "@/components/CardProject";
import { getProjects } from "@/libs/lib_projects";
import { useState, useEffect } from "react";

export default function Proyectos() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getAllProjects = async () => {
      const newProjects = await getProjects();
      if (newProjects.length > 0) setProjects(newProjects);
    };
    getAllProjects();
  }, []);

  return (
    <section className="page-projects">
      {projects.length > 0 ? (
        <>
        <Link href="/" className="link-projects">Volver</Link>
        <section className="section-projects">
          {projects.map((item) => (
            <CardProject key={item.id} item={item} />
          ))}
        </section>
        </>
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
