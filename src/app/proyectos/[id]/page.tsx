"use client";
import { Chat } from "@/components/Chat";
import { ListTasks } from "@/components/ListTasks";
import { ModalPassword } from "@/components/ModalPassword";
import { ControlsProject } from "@/components/ControlsProject";
import { MenuProjects } from "@/components/MenuProjects";
import { useHandleProject } from "@/hooks/useHandleProject";
import { useControlsProject } from "@/hooks/useControlsProject";
import { PropsParams } from "@/types/pages";
import iconDelete from "@/assets/icons/delete.svg";
import "./project.css";
import { VerifyPassword } from "@/components/VerifyPassword";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Project({ params }: PropsParams): JSX.Element {
  const { deleteProject, project, changePassword, addTask, deleteTask, movePassword, verifyPass, user, removeColaborate, valueText, setValueText, colaborators, saveContent, addMessage, messages } =
    useHandleProject(parseInt(params.id));

  const {
    openChat,
    openList,
    openAdduser,
    handleOpenList,
    handleOpenModal,
    handleOpenChat,
  } = useControlsProject();

  return (
    <section className="wrapper-project">
      {user === project.creator || verifyPass ? (
        <section className="project">
          <MenuProjects />
          <section className="section-project">
            <div className="header-project">
              <div className="box-title-delete">
                <h3 className="title-project">{project.title}</h3>
                <img
                  src={iconDelete.src}
                  alt="delete project"
                  width={25}
                  height={25}
                  onClick={deleteProject}
                  className="icon-delete"
                />
              </div>
              <ControlsProject
                openList={handleOpenList}
                openModal={handleOpenModal}
                openChat={handleOpenChat}
              />
            </div>
            <hr />
            <section className="target-project">
              <button className="btn-save" onClick={saveContent}>Guardar</button>
            <ReactQuill theme="snow" value={valueText} onChange={setValueText} />
            </section>
          </section>
          {openChat && <Chat open={openChat} addMessage={addMessage} messages={messages}  />}
          {openList && (
            <ListTasks
              open={openList}
              handleOpenList={handleOpenList}
              project={project}
              addTask={addTask}
              deleteTask={deleteTask}
            />
          )}
          {openAdduser && (
            <ModalPassword
              open={openAdduser}
              handleOpenModal={handleOpenModal}
              project={project}
              colaborators={colaborators}
              changePassword={changePassword}
              removeColaborate={removeColaborate}
              user={user}
            />
          )}
        </section>
      ) : (
        <VerifyPassword movePassword={movePassword} id={project.id} />
      )}
    </section>
  );
}
