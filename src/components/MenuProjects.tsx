"use client"; 
import { useHandleProject } from "@/hooks/useHandleProject";
import "../styles/menu-projects.css";
import { LinkProject } from "./LinkProject";

export const MenuProjects = (): JSX.Element => {
  const { projects } = useHandleProject(); 

  return (
    <nav className="nav-projects">
      <h3 className="title-logo-nav">GestorGroup</h3>
      <div className="box-links-nav">
        {projects.length > 0 && projects.map(({id, title}) => <LinkProject key={id} id={id} title={title} />)}
      </div>
    </nav>
  );
};
