"use client";
import { PropsChat } from "@/types/components";
import "../styles/chat.css";
import { FormEvent, useState } from "react";

export const Chat = ({open, addMessage, messages}: PropsChat): JSX.Element => {
  const [form, setForm] = useState<string>("");
  const submitChat = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    addMessage(form); 
    setForm(""); 
  }

  return (
    <div className={`box-chat ${open ? "open" : ""}`}>
      <ul className="chat">
      {messages.length > 0 && messages.map((item, index) => <li className="message" key={index}>
          <b className="user-chat">{item.username}</b>
          {item.message}
        </li>)}
      </ul>
      <form className="controls-chat" onSubmit={submitChat}>
        <input
          type="text"
          placeholder="Escribe tu mensaje"
          name="message"
          value={form}
          onChange={(e) => setForm(e.target.value)}
          className="input-chat"
        />
        <button type="submit" className="btn-chat">Enviar</button>
      </form>
    </div>
  );
};
