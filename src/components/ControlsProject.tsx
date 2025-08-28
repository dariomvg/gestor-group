"use client";
import iconReturn from "@/assets/icons/return.svg";
import iconNewTask from "@/assets/icons/icon-more.svg";
import iconUserAdd from "@/assets/icons/userAdd.svg";
import iconList from "@/assets/icons/list.svg";
import iconMessages from "@/assets/icons/messages.svg";
import Link from "next/link";
import "@/styles/controls-project.css";
import React from "react";

interface PropsControlsProject {
  openList: () => void;
  openModal: () => void;
  openChat: () => void;
}

function ControlsProject ({ openList, openModal, openChat }: PropsControlsProject) {

  return (
    <div className="box-controls">
      <Link href="/">
        <img
          src={iconReturn.src}
          alt="return"
          width={35}
          height={35}
          className="icon-control icon-link"
          loading="lazy"
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
          loading="lazy"
          title="Nuevo proyecto"
        />
      </Link>
      <img
        src={iconUserAdd.src}
        alt="messages"
        width={35}
        height={35}
        className="icon-control"
        loading="lazy"
        onClick={openModal}
        title="Agregar colaborador"
      />
      <img
        src={iconList.src}
        alt="messages"
        width={35}
        height={35}
        className="icon-control"
        loading="lazy"
        onClick={openList}
        title="Ver tareas"
      />
      <img
        src={iconMessages.src}
        alt="messages"
        width={35}
        height={35}
        className="icon-control"
        loading="lazy"
        onClick={openChat}
        title="Abrír chat"
      />
    </div>
  );
}

export default React.memo(ControlsProject)
