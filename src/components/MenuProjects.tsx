import { getProjects } from "@/libs/lib_projects";
import "../styles/menu-projects.css";
import { LinkProject } from "./LinkProject";

export default async function MenuProjects () {
  const projects = await getProjects(); 

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
