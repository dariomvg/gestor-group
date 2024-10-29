"use client";
import iconReturn from "@/assets/icons/return.svg";
import iconNewTask from "@/assets/icons/icon-more.svg";
import iconUserAdd from "@/assets/icons/userAdd.svg";
import iconList from "@/assets/icons/list.svg";
import iconMessages from "@/assets/icons/messages.svg";
import Link from "next/link";
import "@/styles/controls-project.css";

export const ControlsProject = ({ openList, openModal, openChat }): JSX.Element => {

  return (
    <div className="box-controls">
      <Link href="/">
        <img
          src={iconReturn.src}
          alt="return"
          width={35}
          height={35}
          className="icon-control icon-link"
          title="Volver"
        />
      </Link>
      <Link href="/nuevo">
        <img
          src={iconNewTask.src}
          alt="return"
          width={35}
          height={35}
          className="icon-control icon-link"
          title="Nuevo proyecto"
        />
      </Link>
      <img
        src={iconUserAdd.src}
        alt="messages"
        width={35}
        height={35}
        className="icon-control"
        onClick={openModal}
        title="Agregar colaborador"
      />
      <img
        src={iconList.src}
        alt="messages"
        width={35}
        height={35}
        className="icon-control"
        onClick={openList}
        title="Ver tareas"
      />
      <img
        src={iconMessages.src}
        alt="messages"
        width={35}
        height={35}
        className="icon-control"
        onClick={openChat}
        title="Abrír chat"
      />
    </div>
  );
}
