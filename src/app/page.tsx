import { Header } from "@/components/Header";
import Link from "next/link";
import "./page.css";

export default function Home() {
  return (
    <main className="main">
      <Header />
      <section className="section-main">
        <h1 className="title-logo">GestorGroup</h1>
        <h2 className="subtitle-main">
          Crea proyectos <b>colaborativos</b> y{" "}
          <b>trabaja</b> con tu grupo
        </h2>
        <Link href="/proyectos" className="link-main">
          Comenzar
        </Link>
      </section>
    </main>
  );
}
