"use client";
import { CustomControls } from "@/types/global";
import { useState } from "react";

export const useControlsProject = (): CustomControls => {
  const [openChat, setOpenChat] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [openAdduser, setOpenAdduser] = useState(false);

  const handleOpenModal = () => {
    setOpenAdduser(!openAdduser);
  };

  const handleOpenList = () => {
    setOpenList(!openList);
  };

  const handleOpenChat = () => {
    setOpenChat(!openChat);
  };

  return {
    openChat,
    openList,
    openAdduser,
    handleOpenList,
    handleOpenModal,
    handleOpenChat,
  };
};
