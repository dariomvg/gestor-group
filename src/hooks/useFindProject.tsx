"use client";
import { useEffect, useState } from "react";
import { CustomFindProject } from "@/types/components";
import { objBase } from "@/utils/object-project";
import { getProject } from "@/libs/services";
import { ObjBaseType } from "@/types/global";

export const useFindProject = (id: number): CustomFindProject => {
  const [project, setProject] = useState<ObjBaseType>(objBase);

  useEffect(() => {
    if (id) {
      const getUniqueProject = async () => {
        const foundProject = await getProject(id);
        setProject(foundProject[0]);
      };
      getUniqueProject();
    }
  }, [id]);

  return { project };
};
