"use client";
import { addNewMessage, getMessages, deleteMessage } from "@/libs/lib_chat";
import "../styles/chat.css";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { getLocalHour, getShortDate } from "format-all-dates";
import { supabase } from "@/supabase/supabase";
import iconDelete from "@/assets/icons/delete.svg"

function Chat({
  open,
  username,
  project_id,
}: {
  open: boolean;
  username: string;
  project_id: number;
}) {
  const refInput = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState([]);

  const getAllMessages = async () => {
    const newMessages = await getMessages(project_id);
    if (newMessages.length > 0) setMessages(newMessages);
  };

  const submitFormChat = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMsg = refInput.current.value;
    if (!newMsg) return;
    const date_msg = `${getShortDate()} - ${getLocalHour()}Hs`;
    addNewMessage({ username, message: newMsg, date_msg, project_id });
    refInput.current.value = "";
  };

  useEffect(() => {
    getAllMessages();

    const channel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        (payload) => {
          console.log("payload: ",payload)
          if (payload.eventType === "INSERT") {
            setMessages((prevMessages) => [...prevMessages, payload.new]);
          }
          if (payload.eventType === "DELETE") {
            setMessages((prevMessages) =>
              prevMessages.filter((msg) => msg.id !== payload.old.id)
            );
          }
        }
      ).subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [project_id]);

  return (
    <div className={`box-chat ${open ? "open" : ""}`}>
      <ul className="chat">
        {messages.length > 0 &&
          messages.map((item) => (
            <li className="message" key={item.id}>
              <div className="container-message">
                <strong className="username-message">{item.username}</strong>
                <div className="container-delete-message">
                <p className="date-message">{item.date_msg}</p>
                <img src={iconDelete.src} alt="icon eliminar mensaje" width={20} height={20} title="Eliminar mensaje" className="icon-delete-msg" onClick={() => deleteMessage(item.id)} />
        
                </div>
              </div>
              <p className="content-message">{item.message}</p>
            </li>
          ))}
      </ul>
      <form className="controls-chat" onSubmit={submitFormChat}>
        <input
          type="text"
          placeholder="Escribe tu mensaje"
          name="message"
          className="input-chat"
          ref={refInput}
          required
        />
        <button type="submit" className="btn-chat">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default React.memo(Chat);
