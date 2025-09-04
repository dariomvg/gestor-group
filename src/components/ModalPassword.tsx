"use client";
import "../styles/modal-password.css";
import iconView from "../assets/icons/view.svg";
import iconHidden from "../assets/icons/hidden.svg";
import iconCopy from "../assets/icons/copy.svg";
import React, { useState } from "react";
import { ObjBaseType } from "@/types/global";
import { updatePassword } from "@/libs/lib_password";
import { hidden_password } from "@/utils/password-hidden";
import crypto from "crypto";

interface PropsModal {
  open: boolean;
  handleOpenModal: () => void;
  project: ObjBaseType;
}

function ModalPassword({ open, handleOpenModal, project }: PropsModal) {
  const [viewPass, setViewPass] = useState(false);
  const [password, setPassword] = useState<string>(project.password);
  const [msg, setMsg] = useState("");

  const changePassword = async () => {
    const newPassword = crypto.randomBytes(8).toString("hex");
    const passwordSaved = await updatePassword(newPassword, project.id);
    if (passwordSaved) setPassword(passwordSaved);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(project.password);
    setMsg("Copiado");
  };

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
          <p className="password">{viewPass ? password : hidden_password}</p>
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
    </section>
  );
}

export default React.memo(ModalPassword);
