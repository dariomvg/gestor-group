"use client";
import "../styles/modal-password.css";
import iconView from "../assets/icons/view.svg";
import iconHidden from "../assets/icons/hidden.svg";
import iconCopy from "../assets/icons/copy.svg";
import React, { useEffect, useState } from "react";
import { ObjBaseType } from "@/types/global";
import { useAuth } from "@/contexts/ContextAuth";
import { updateNewPassword } from "@/libs/lib_password";
import { getAllColaborates } from "@/libs/lib_colaborators";
import { ListColaborators } from "./ListColaborators";
import { hidden_password } from "@/utils/password-hidden";

interface PropsModal {
  open: boolean;
  handleOpenModal: () => void;
  project: ObjBaseType;
}

function ModalPassword({ open, handleOpenModal, project }: PropsModal) {
  const [colaborators, setColaborators] = useState([]);
  const [viewPass, setViewPass] = useState(false);
  const [msg, setMsg] = useState("");
  const { user } = useAuth();

  const changePassword = () => {
    const newPassword = "Colocar crypto UUID, para a contraseña";
    updateNewPassword(newPassword, project.id);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(project.password);
    setMsg("Copiado");
  };

  useEffect(() => {
    const getColaborators = async () => {
      const newColaborators = await getAllColaborates(project.id);
      if (newColaborators.length > 0) setColaborators(newColaborators);
    };
    getColaborators();
  }, []);

  return (
    <section className={`modal-password ${open ? "openModal" : ""}`}>
      <div className="modal">
        <button className="btn-close-modal" onClick={handleOpenModal}>
          X
        </button>
        <p className="title-modal">
          puedes agregar colaboradores compartiendo la contraseña del proyecto
        </p>
        <button className="btn-create-pass" onClick={changePassword}>
          Cambiar contraseña
        </button>
        {msg && <p className="msg-copy">{msg}</p>}
        <div className="box-password">
          <p className="password">
            {viewPass ? project.password : hidden_password}
          </p>
          <div className="icons-box-password">
            <img
              src={iconCopy.src}
              alt="icon copy"
              width={30}
              height={30}
              className="icon-password"
              loading="lazy"
              title="Copiar contraseña"
              onClick={copyPassword}
            />
            {viewPass ? (
              <img
                src={iconHidden.src}
                alt="icon hidden"
                width={30}
                height={30}
                className="icon-password"
                loading="lazy"
                title="Ocultar contraseña"
                onClick={() => setViewPass(!viewPass)}
              />
            ) : (
              <img
                src={iconView.src}
                alt="icon view"
                width={30}
                height={30}
                loading="lazy"
                className="icon-password"
                title="Ver contraseña"
                onClick={() => setViewPass(!viewPass)}
              />
            )}
          </div>
        </div>
      </div>
      <ListColaborators
        colaborators={colaborators}
        actualUser={user.username}
        creator={project.creator}
      />
    </section>
  );
}

export default React.memo(ModalPassword);
