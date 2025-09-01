"use client"; 
import { getProjects } from "@/libs/lib_projects";
import "../styles/menu-projects.css";
import { LinkProject } from "./LinkProject";
import { useState, useEffect } from "react";

export default function MenuProjects () {
  const [projects, setProjects] = useState([]);
  
    useEffect(() => {
      const getAllProjects = async () => {
        const newProjects = await getProjects();
        if (newProjects.length > 0) setProjects(newProjects);
      };
      getAllProjects();
    }, []);

  return (
    <nav className="nav-projects">
      <h3 className="title-logo-nav">GestorGroup</h3>
      <div className="box-links-nav">
        {projects.length > 0 &&
          projects.map(({ id, title }) => (
            <LinkProject key={id} id={id} title={title} />
          ))}
      </div>
    </nav>
  );
};
