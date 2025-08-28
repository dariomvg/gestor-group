"use client";
import { addNewMessage, getAllMessages } from "@/libs/lib_chat";
import "../styles/chat.css";
import React, { FormEvent, useEffect, useRef, useState } from "react";

function Chat({ open }: { open: boolean }) {
  const refInput = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState([]);

  const submitFormChat = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!refInput.current.value) return;
    addNewMessage(refInput.current.value, 18, "dariomvg"); // cambiar despues
    refInput.current.value = "";
  };

  useEffect(() => {
    const getMessages = async () => {
      const newMessages = await getAllMessages(1);
      if (newMessages.length > 0) setMessages(newMessages); // cambiar despues
    };
    getMessages();
  }, [messages]);

  return (
    <div className={`box-chat ${open ? "open" : ""}`}>
      <ul className="chat">
        {messages.length > 0 &&
          messages.map((item, index) => (
            <li className="message" key={index}>
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
