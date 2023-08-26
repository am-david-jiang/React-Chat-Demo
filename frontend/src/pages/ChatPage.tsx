import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";

import useInput from "../hooks/useInput";
import useModal from "../hooks/useModal";
import useAuthStore from "../stores/useAuthStore";
import useChatStore from "../stores/useChatStore";

import Input from "../components/Input";
import TopBar from "../components/TopBar";
// import MembersList from "../components/lists/MembersList";
import { testMembers } from "../utils/Test";
import Modal from "../components/Modal";
import ChatArea from "../components/ChatArea";

import "../sass/pages/chat.scss";
import defaultAvatar from "../assets/avatar.png";
import {
  AddUserResponse,
  Message,
  TextMessageSocketResponse,
  ImageMessageSocketResponse,
} from "../utils/Types";
import MemberListItem from "../components/listItems/MemberListItem";

import socket from "../socket";
import { getImageUrl } from "../utils/Helper";
import useTitle from "../hooks/useTitle";
import ModalContent from "../components/ModalContent";
import useMeasure from "../hooks/useMeasure";
import VirtualizedMembersList from "../components/lists/VirtualizedMembersList";

export default function ChatPage() {
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentUserAvatar, setCurrentUserAvatar] = useState("");
  const [currentUserStatus, setCurrentUserStatus] = useState("offline");
  const [searchUsername, setSearchUsername] = useInput("");
  const [newUser, setNewUser] = useInput("");
  const { isOpen, toggle } = useModal();

  const username = useAuthStore((state) => state.username);
  const contacts = useChatStore((state) => state.getContacts(searchUsername));

  const addUser = useChatStore((state) => state.addUser);
  const addMessage = useChatStore((state) => state.addMessage);
  const readAll = useChatStore((state) => state.readAll);
  const online = useChatStore((state) => state.online);
  const offline = useChatStore((state) => state.offline);

  const [memberRef, memberRect] = useMeasure<HTMLUListElement>();

  useTitle(`Chat`);

  // Initialization of Store and Socket
  useEffect(() => {
    socket.connect();
    socket.emit("online", username);
    socket.on(
      "textMessage",
      ({ user, text, date }: TextMessageSocketResponse) => {
        console.log(user, text, date);
        const newMessage: Message = {
          bySender: true,
          type: "text",
          message: text,
          date,
        };
        addMessage(user, newMessage);
      }
    );

    socket.on(
      "imageMessage",
      ({ user, image, date }: ImageMessageSocketResponse) => {
        console.log(user, image, date);
        const newMessage: Message = {
          bySender: true,
          type: "image",
          message: getImageUrl(image),
          date,
        };
        addMessage(user, newMessage);
      }
    );

    socket.on("userOnline", (username) => {
      online(username);
    });

    socket.on("userOffline", (username) => {
      offline(username);
    });

    return () => {
      socket.off("textMessage");
      socket.off("imageMessage");
      socket.off("userOnline");
      socket.off("userOffline");
      socket.disconnect();
    };
  }, []);

  // Change current user avatar when current user changes
  useEffect(() => {
    const user = contacts.find((user) => user.username === currentUsername);
    if (user) {
      setCurrentUserAvatar(user.avatar);
      setCurrentUserStatus(user.status);
      readAll(currentUsername);
    } else {
      setCurrentUserAvatar(defaultAvatar);
      setCurrentUserStatus("offline");
    }
  }, [currentUsername]);

  const handleClickToAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append("username", newUser);

    try {
      const res = await fetch("http://localhost:5000/user/online?" + params, {
        method: "GET",
        credentials: "include",
      });
      const json = (await res.json()) as AddUserResponse;
      if (!json.success) {
        throw new Error(json.msg);
      } else {
        toggle();
        addUser(json.username, json.avatar);
      }
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        toast(err.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  return (
    <div className='chat'>
      <div className='chat-container'>
        <div className='chat-sidebar'>
          <div style={{ padding: "1.25rem", width: "100%" }}>
            <TopBar onClick={toggle} />
            <Input
              state={searchUsername}
              handleChange={setSearchUsername}
              placeholder='Search for...'
              type='text'
              isSmall={true}
            />
          </div>
          {/* <MembersList
            data={contacts}
            renderItem={MemberListItem}
            action={setCurrentUsername}
          /> */}
          <VirtualizedMembersList
            ref={memberRef}
            data={contacts}
            renderItem={MemberListItem}
            action={setCurrentUsername}
            itemHeight={72}
            containerHeight={memberRect.height}
          />
        </div>
        <div className='chat-area'>
          {currentUsername ? (
            <ChatArea
              setCurrentName={setCurrentUsername}
              username={currentUsername}
              avatar={currentUserAvatar}
              status={currentUserStatus}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {createPortal(
        <Modal isOpen={isOpen} title='Add User'>
          <ModalContent
            state={newUser}
            handleChange={setNewUser}
            cancelAction={() => toggle()}
            okAction={handleClickToAddUser}
          />
        </Modal>,
        document.body
      )}
    </div>
  );
}
