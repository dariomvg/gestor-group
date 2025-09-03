"use client";
import Link from "next/link";
import "../styles/header.css";
import { login, logout } from "@/libs/lib_auth";
import { useAuth } from "@/contexts/ContextAuth";
import iconGithub from "../assets/icons/github.svg";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <header className="header">
      <nav className="navbar">
        <section className="container-navbar">
          <Link href="/proyectos" className="link-nav">
            Proyectos
          </Link>
          <Link href="/nuevo" className="link-nav">
            Nuevo
          </Link>
          {user ? (
            <>
              <img
                src={user.picture}
                alt={user.username}
                style={{ borderRadius: "50%" }}
                width={30}
                height={30}
              />
              <p className="title-user">{user.username}</p>
              <button
                className="login"
                onClick={() => {
                  logout();
                  router.push("/registrarse");
                }}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <button className="login" onClick={login}>
              Iniciar sesión
            </button>
          )}
        </section>

        <a
          href="https://github.com/dariomvg/gestor-group"
          className="link-github"
          target="_blank"
          rel="norreferer">
          <img
            src={iconGithub.src}
            alt="github link"
            width={25}
            height={25}
            className="icon-github"
            loading="lazy"
          />
        </a>
      </nav>
    </header>
  );
};
