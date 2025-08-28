"use client";
import ReactQuill from "react-quill";
import MenuProjects from "@/components/MenuProjects";
import ControlsProject from "@/components/ControlsProject";

const objDynamic = {ssr: false, loading: () => <Loader />};

const Chat = dynamic(() => import("@/components/Chat"), objDynamic);
const ListTasks = dynamic(() => import("@/components/ListTasks"), objDynamic);
const ModalPassword = dynamic(
  () => import("@/components/ModalPassword"),
  objDynamic
);
const VerifyPassword = dynamic(
  () => import("@/components/VerifyPassword"),
  objDynamic
);
import { useControlsProject } from "@/hooks/useControlsProject";
import { Loader } from "@/components/Loader";
import dynamic from "next/dynamic";
import iconDelete from "@/assets/icons/delete.svg";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ObjBaseType } from "@/types/global";
import { objBase } from "@/utils/object-project";
import { useAuth } from "@/contexts/ContextAuth";
import { addColaborate, getColaborate } from "@/libs/lib_colaborators";
import { saveContentEditor } from "@/libs/lib_content";
import { getProject, removeProject } from "@/libs/lib_projects";
import "react-quill/dist/quill.snow.css";
import "./project.css";

export default function Project({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const { user } = useAuth();
  const {
    openChat,
    openList,
    openAdduser,
    handleOpenList,
    handleOpenModal,
    handleOpenChat,
  } = useControlsProject();

  const [project, setProject] = useState<ObjBaseType>(objBase);
  const [verify, setVerify] = useState<boolean>(false);
  const [valueText, setValueText] = useState<string>("");

  const accessUser = async () => {
    const colaborate = await getColaborate(user.user_id);
    if (!colaborate) {
      addColaborate(project.id, user.user_id);
    }
    setVerify(true);
  };

  const saveContent = async () => {
    saveContentEditor(valueText, project.id);
  };

  useEffect(() => {
    if (id) {
      const getUniqueProject = async () => {
        const foundProject = await getProject(parseInt(id));
        setProject(foundProject[0]);
        setValueText(foundProject[0].content);
      };
      getUniqueProject();
    }
  }, [id]);  

  return (
    <section className="wrapper-project">
      {user.user_id === project.creator || verify ? (
        <section className="project">
          <MenuProjects />
          <section className="section-project">
            <div className="header-project">
              <div className="box-title-delete">
                <h3 className="title-project">{project.title}</h3>
                <img
                  src={iconDelete.src}
                  alt="delete project"
                  loading="lazy"
                  width={25}
                  height={25}
                  onClick={() => {
                    removeProject(project.id);
                    router.push("/proyectos");
                  }}
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
              <button className="btn-save" onClick={saveContent}>
                Guardar
              </button>
              <ReactQuill
                theme="snow"
                value={valueText}
                onChange={setValueText}
              />
            </section>
          </section>
          <Chat open={openChat} />
          <ListTasks open={openList} handleOpenList={handleOpenList} />
          <ModalPassword
            open={openAdduser}
            handleOpenModal={handleOpenModal}
            project={project}
          />
        </section>
      ) : (
        <VerifyPassword accessUser={accessUser} id={project.id} />
      )}
    </section>
  );
}
