"use client";
import Link from "next/link";
import "../styles/header.css";
import { login, logout } from "@/libs/lib_auth";
import { useAuth } from "@/contexts/ContextAuth";

export const Header = () => {
  const { user } = useAuth();
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
          {user.user_id ? (
            <>
              <button className="login" onClick={logout}>
                Cerrar Sesión
              </button>
              <p className="title-user">{user.username}</p>
            </>
          ) : (
            <button className="login" onClick={login}>
              Iniciar sesión
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};
