import Link from "next/link";
import "../styles/menu-projects.css";

export const LinkProject = ({ id, title }: { id: number; title: string }) => {
  return (
    <Link href={`/proyectos/${id}`} className="link-menu-project">
      {title}
    </Link>
  );
};
