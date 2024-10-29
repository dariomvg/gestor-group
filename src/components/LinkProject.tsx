import Link from "next/link";
import "../styles/menu-projects.css"; 
import { PropsLinkProject } from "@/types/components";

export const LinkProject = ({id, title}: PropsLinkProject): JSX.Element => {
  return (
    <Link href={`/proyectos/${id}`} className="link-nav-project">{title}</Link>
  )
}
