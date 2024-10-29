import { Header } from "@/components/Header";
import { CardMain } from "@/components/CardMain";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import "./page.css";

export default function Home(): JSX.Element {
  return (
    <main className="main">
      <Header />
      <section className="section-main">
        <h2 className="title-logo">GestorGroup</h2>
        <div className="details-main">
          <p className="detail-main">Crea proyectos <b className="t-m">colaborativos</b> </p>
          <p className="detail-main">y <b className="t-m">trabaja</b> con tu grupo</p>
          <p className="detail-main">de confianza</p>
        </div>
        <Link href="/proyectos" className="link-main">
          Comenzar
        </Link>
      </section>
      <section className="section-cards">
        <CardMain>
          <h3 className="title-card">Colaborativo</h3>
          <ul className="box-items">
            <li className="item-card">Invita y agrega a quien quieras</li>
            <li className="item-card">
              Elimina a un colabo rador cuando quieras
            </li>
          </ul>
        </CardMain>
        <CardMain>
          <h3 className="title-card">Simple</h3>
          <ul className="box-items">
            <li className="item-card">UI intuitiva</li>
            <li className="item-card">Fácil de usar y creación de proyectos</li>
          </ul>
        </CardMain>
        <CardMain>
          <h3 className="title-card">Múltiples usos</h3>
          <ul className="box-items">
            <li className="item-card">Lista de tareas</li>
            <li className="item-card">Chat de mensajes</li>
            <li className="item-card">Editor de texto </li>
            <li className="item-card">Más...</li>
          </ul>
        </CardMain>
      </section>
      <Footer />
    </main>
  );
}
