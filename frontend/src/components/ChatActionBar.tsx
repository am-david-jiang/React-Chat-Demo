import styled from "styled-components";

import Icon from "./icons/Icon";
import TextInput from "./TextInput";
import { Message } from "../utils/Types";
import useChatStore from "../stores/useChatStore";

import socket from "../socket";
import useInput from "../hooks/useInput";
import ImageFileInput from "./ImageFileInput";

export interface IChatActionBarProps {
  username: string;
}

const ChatActionBarStyled = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5rem 1.25rem;
  align-items: center;
  gap: 1rem;
`;

export default function ChatActionBar(props: IChatActionBarProps) {
  const addMessage = useChatStore((state) => state.addMessage);
  const [message, setMessage, clearMessage] = useInput("");

  const handleMessageSend = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const date = Date.now();
    socket.emit("textMessage", {
      receiverUsername: props.username,
      text: message,
      date,
    });

    const newMessage: Message = {
      bySender: false,
      type: "text",
      message: message,
      date,
    };
    addMessage(props.username, newMessage, true);
    clearMessage();
  };

  return (
    <ChatActionBarStyled>
      {/* <Icon icon='image' /> */}
      <ImageFileInput currentUsername={props.username} />
      <TextInput state={message} handleChanged={setMessage} />
      <Icon icon='send' onClick={handleMessageSend} />
    </ChatActionBarStyled>
  );
}
