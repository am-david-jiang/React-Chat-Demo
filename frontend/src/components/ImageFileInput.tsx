import React, { useRef } from "react";
import socket from "../socket";

import Icon from "./icons/Icon";
import { Message } from "../utils/Types";
import useChatStore from "../stores/useChatStore";

type ImageFileInputProps = {
  currentUsername: string;
};

export default function ImageFileInput(props: ImageFileInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const addMessage = useChatStore((state) => state.addMessage);

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];
      const date = Date.now();
      socket.emit("imageMessage", {
        receiverUsername: props.currentUsername,
        image: file,
        date,
      });

      const url = URL.createObjectURL(file);

      const newMessage: Message = {
        bySender: false,
        type: "image",
        message: url,
        date,
      };
      addMessage(props.currentUsername, newMessage, true);
      e.currentTarget.value = "";
    }
  };

  return (
    <>
      <input
        type='file'
        id='file-upload'
        hidden
        ref={ref}
        onChange={fileChangeHandler}
      />
      <label htmlFor='file-upload'>
        <Icon icon='image' />
      </label>
    </>
  );
}
