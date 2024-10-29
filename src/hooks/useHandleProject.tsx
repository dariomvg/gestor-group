"use client";
import { useContextProject } from "@/contexts/ContextProject";
import { generatePassword } from "@/libs/createPassword";
import {
  addColaborate,
  addNewMessage,
  addNewProject,
  deleteColaborate,
  getAllColaborates,
  getAllMessages,
  getColaborate,
  getProject,
  getProjects,
  removeProject,
  saveContentEditor,
  updateNewPassword,
  updateProject,
  updateTasks,
} from "@/libs/services";
import { supabase } from "@/supabase/supabase";
import { Colaborator, CustomHandleProject } from "@/types/components";
import { ObjBaseType } from "@/types/global";
import { objBase } from "@/utils/object-project";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useHandleProject = (id: number = null): CustomHandleProject => {
  const [projects, setProjects] = useState<ObjBaseType[]>([]);
  const [project, setProject] = useState<ObjBaseType>(objBase);
  const [verifyPass, setVerifyPass] = useState<boolean>(false);
  const [colaborators, setColaborators] = useState<Colaborator[]>([]);
  const [messages, setMessages] = useState([]);
  const [valueText, setValueText] = useState("");
  const { user } = useContextProject();
  const router = useRouter();

  const addProject = async (project: ObjBaseType, user: string) => {
    if (project.id) {
      await updateProject(project);
    } else {
      await addNewProject(project, user);
    }
  };

  const deleteProject = async () => {
    removeProject(project.id);
    router.push("/proyectos");
  };

  const addTask = (data: string) => {
    const idTask = Math.floor(100 + Math.random() * 900);
    const newTask = {
      id: idTask,
      task: data,
    };
    setProject((prevState) => ({
      ...prevState,
      tasks: [...prevState.tasks, newTask],
    }));
  };

  const deleteTask = (id: number) => {
    setProject((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((item) => item.id !== id),
    }));
    updateTasks(project.tasks, project.id);
  };

  const changePassword = () => {
    const newPassword = generatePassword();
    setProject({ ...project, password: newPassword });
    updateNewPassword(newPassword, project.id);
  };

  const movePassword = async (verify: boolean) => {
    const colaborate = await getColaborate(user);
    if (colaborate) {
      setVerifyPass(true);
      return;
    }
    const data = await addColaborate(project.id, user);
    setColaborators([...colaborators, data]);
    setVerifyPass(verify);
  };

  const removeColaborate = async (name: string) => {
    await deleteColaborate(name);
  };

  const saveContent = async () => {
    await saveContentEditor(valueText, project.id);
  };

  const addMessage = async (msg: string) => {
    const dataMsg = await addNewMessage(msg, project.id, user);
  };

  useEffect(() => {
    const receiveMessages = async () => {
      const allMessages = await getAllMessages(project.id);
      setMessages(allMessages);
    };
    receiveMessages();
  }, [project.id, messages]);

  const receiveMessages = (payload: any) => {
    const newMsg = {
      username: payload.new.username,
      message: payload.new.message,
    }
    setMessages([...messages, newMsg ]);
  }

  useEffect(() => {
    const channel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "chat" },
        receiveMessages
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, messages]);

  useEffect(() => {
    updateTasks(project.tasks, project.id);
  }, [project.tasks]);

  useEffect(() => {
    const getColaborates = async () => {
      const colaborates = await getAllColaborates(project.id);
      if (colaborates) {
        setColaborators(colaborates);
      }
    };
    getColaborates();
  }, [colaborators]);

  useEffect(() => {
    const getAllProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };
    getAllProjects();
  }, []);

  useEffect(() => {
    if (id) {
      const getUniqueProject = async () => {
        const foundProject = await getProject(id);
        setProject(foundProject[0]);
        setValueText(foundProject[0].content);
      };
      getUniqueProject();
    }
  }, [id]);

  return {
    addProject,
    deleteProject,
    projects,
    addTask,
    deleteTask,
    project,
    changePassword,
    movePassword,
    verifyPass,
    user,
    removeColaborate,
    colaborators,
    valueText,
    setValueText,
    saveContent,
    addMessage,
    messages,
  };
};
