"use client";
import Link from "next/link";
import "../styles/header.css";
import { useRouter } from "next/navigation";
import { useContextProject } from "@/contexts/ContextProject";

export const Header = (): JSX.Element => {
  const { logout, user } = useContextProject();
  const router = useRouter(); 

  const handleLogout = () => {
    logout(); 
    router.push("/")
  }

  return (
    <header className="header">
      <nav className="navbar">
        <Link href="/" className="link-logo">
          GestorGroup
        </Link>
        <div className="links">
          <Link href="/nuevo" className="link-nav">
            Nuevo
          </Link>
          <Link href="/proyectos" className="link-nav">
            Proyectos
          </Link>
          {user ? (
            <>
              <button className="login" onClick={handleLogout}>Cerrar Sesión</button>
              <p className="title-user">
                {user} <span className="line"></span>
              </p>
            </>
          ) : (
            <Link href="/registrarse" className="login">
              Registrarse
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
