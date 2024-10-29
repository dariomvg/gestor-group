import "../styles/modal-password.css";
import iconView from "../assets/icons/view.svg";
import iconHidden from "../assets/icons/hidden.svg";
import iconCopy from "../assets/icons/copy.svg";
import iconDelete from "../assets/icons/deleteColaborate.svg";
import { useState } from "react";
import { PropsListColaborates, PropsModalPassword } from "@/types/components";

const ListColaborates = ({ colaborators, verifyRemoveColaborate }: PropsListColaborates): JSX.Element => {

  return (
    <ul className="list-colaborates">
      {colaborators.length > 0 &&
        colaborators.map((user, index) => (
          <li className="colaborate" key={index}>
            {user.name}
            <img
              src={iconDelete.src}
              alt="icon delete colaborate"
              width={25}
              height={25}
              className="delete-colaborate"
              title="eliminar colaborador"
              onClick={() => verifyRemoveColaborate(user.name)}
            />
          </li>
        ))}
    </ul>
  );
};

export const ModalPassword = ({
  open,
  handleOpenModal,
  project, 
  changePassword,
  removeColaborate,
  colaborators,
  user
}: PropsModalPassword): JSX.Element => {

  const [viewPass, setViewPass] = useState(false);
  const [msg, setMsg] = useState("");

  const copyPassword = () => {
    navigator.clipboard.writeText(project.password);
    setMsg("Copiado");
  };

  const verifyRemoveColaborate = (nameUser: string) => {
    if(user !== project.creator){
      setMsg("No tiene la autorizacion para eliminar miembros"); 
      return; 
    }
    removeColaborate(nameUser)
  }


  return (
    <section className={`modal-password ${open ? "openModal" : ""}`}>
      <div className="modal">
        <button className="btn-close-modal" onClick={handleOpenModal}>
          X
        </button>
        <p className="title-modal">
          puedes agregar colaboradores compartiendo la contraseña del proyecto
        </p>
        <button className="btn-create-pass" onClick={changePassword}>Cambiar contraseña</button>
        {msg && <p className="msg-copy">{msg}</p>}
        <div className="box-password">
          <p className="password">
            {viewPass ? project.password : "******************"}
          </p>
          <div className="icons-box-password">
            <img
              src={iconCopy.src}
              alt="icon copy"
              width={30}
              height={30}
              className="icon-password"
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
                title="Ocultar contraseña"
                onClick={() => setViewPass(!viewPass)}
              />
            ) : (
              <img
                src={iconView.src}
                alt="icon view"
                width={30}
                height={30}
                className="icon-password"
                title="Ver contraseña"
                onClick={() => setViewPass(!viewPass)}
              />
            )}
          </div>
        </div>
      </div>
      <ListColaborates colaborators={colaborators} verifyRemoveColaborate={verifyRemoveColaborate} />
    </section>
  );
};
