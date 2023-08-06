import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

import { Message } from "../utils/Types";
import { getAvatarUrl } from "../utils/Helper";

enum Status {
  online = "Online",
  offline = "Offline",
}

type Chat = {
  username: string;
  avatar: string;
  unreadNum: number;
  status: Status;
  messages: Array<Message>;
};

type State = {
  chats: Chat[];
};

type Action = {
  addUser: (
    username: string,
    avatar: string,
    message?: Message | Array<Message>
  ) => void;
  addMessage: (username: string, message: Message, own?: boolean) => void;
  getContacts: (username?: string) => Contacts[];
  readAll: (username: string) => void;
  online: (username: string) => void;
  offline: (username: string) => void;
};

type Contacts = {
  username: string;
  avatar: string;
  status: string;
  unreadNum: number;
  lastMessage: string;
  time: number | null;
};

const useChatStore = create(
  devtools(
    immer<State & Action>((set, get) => ({
      chats: Array<Chat>(),

      addUser(username, avatar, message?) {
        const user = get().chats.find((chat) => chat.username === username);
        let newMsgNum = 0;
        if (!user) {
          let newMessage: Array<Message> = [];
          if (!message) {
            newMessage = [];
          } else if (Array.isArray(message)) {
            newMessage = message;
            newMsgNum = message.length;
          } else {
            newMessage = [message];
            newMsgNum = 1;
          }

          const newUser: Chat = {
            username,
            avatar: getAvatarUrl(avatar),
            status: Status.online,
            unreadNum: newMsgNum,
            messages: newMessage,
          };
          set((state) => {
            state.chats.push(newUser);
          });
        }
      },

      async addMessage(username, message, own) {
        const newMsgNum = own ? 0 : 1;
        const userIndex = get().chats.findIndex(
          (chat) => chat.username === username
        );
        if (userIndex !== -1) {
          set((state) => {
            state.chats[userIndex].messages.push(message);
            state.chats[userIndex].unreadNum += newMsgNum;
          });
        } else {
          const params = new URLSearchParams();
          params.append("username", username);
          try {
            const res = await fetch(
              "http://localhost:5000/user/avatar?" + params.toString(),
              {
                method: "GET",
                credentials: "include",
              }
            );
            const { avatar } = await res.json();
            get().addUser(username, avatar, message);
          } catch (err) {
            if (err instanceof Error) {
              console.log(err.message);
            } else {
              console.log(err);
            }
          }
        }
      },
      getContacts(username?: string) {
        const chats = username
          ? get().chats.filter((chat) => chat.username === username)
          : get().chats;

        if (chats) {
          return chats.map((chat) => ({
            username: chat.username,
            avatar: chat.avatar,
            status: chat.status.toString(),
            unreadNum: chat.unreadNum,
            lastMessage: chat.messages[chat.messages.length - 1]?.message || "",
            time: chat.messages[chat.messages.length - 1]?.date || null,
          }));
        } else {
          return [];
        }
      },
      readAll(username) {
        const userIndex = get().chats.findIndex(
          (user) => user.username === username
        );
        if (userIndex !== -1) {
          set((state) => {
            state.chats[userIndex].unreadNum = 0;
          });
        }
      },
      online(username) {
        const userIndex = get().chats.findIndex(
          (user) => user.username === username
        );
        if (userIndex !== -1) {
          set((state) => {
            state.chats[userIndex].status = Status.online;
          });
        }
      },
      offline(username) {
        const userIndex = get().chats.findIndex(
          (user) => user.username === username
        );
        if (userIndex !== -1) {
          set((state) => {
            state.chats[userIndex].status = Status.offline;
          });
        }
      },
    }))
  )
);

export default useChatStore;
