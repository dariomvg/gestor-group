"use client";
import { addNewMessage, getMessages } from "@/libs/lib_chat";
import "../styles/chat.css";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { getLocalHour, getShortDate } from "format-all-dates";

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

  const submitFormChat = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMsg = refInput.current.value;
    if (!newMsg) return;
    const date_msg = `${getShortDate()} - ${getLocalHour()}Hs`;
    addNewMessage({ username, message: newMsg, date_msg, project_id });
    refInput.current.value = "";
  };

  useEffect(() => {
    const getAllMessages = async () => {
      const newMessages = await getMessages(project_id);
      if (newMessages.length > 0) setMessages(newMessages);
    };
    getAllMessages();
  }, [messages]);

  return (
    <div className={`box-chat ${open ? "open" : ""}`}>
      <ul className="chat">
        {messages.length > 0 &&
          messages.map((item) => (
            <li className="message" key={item.id}>
              <b className="user-chat">{item.username}</b>
              {item.message}
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

// useEffect(() => {
//   const receiveMessages = async () => {
//     const allMessages = await getAllMessages(project.id);
//     setMessages(allMessages);
//   };
//   receiveMessages();
// }, [project.id, messages]);

// const receiveMessages = (payload: any) => {
//   const newMsg = {
//     username: payload.new.username,
//     message: payload.new.message,
//   }
//   setMessages([...messages, newMsg ]);
// }

// useEffect(() => {
//   const channel = supabase
//     .channel("custom-all-channel")
//     .on(
//       "postgres_changes",
//       { event: "*", schema: "public", table: "chat" },
//       receiveMessages
//     )
//     .subscribe();

//   return () => {
//     supabase.removeChannel(channel);
//   };
// }, [supabase, messages]);
