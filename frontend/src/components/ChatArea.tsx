import ChatTopBar from "./ChatTopBar";
import ChatActionBar from "./ChatActionBar";
import MessageItem from "./listItems/MessageItem";
import MessageList from "./lists/MessagesList";

import useChatStore from "../stores/useChatStore";
import useAuthStore from "../stores/useAuthStore";

type ChatAreaProps = {
  username: string;
  avatar: string;
  status: string;
  setCurrentName: React.Dispatch<React.SetStateAction<string>>;
};

export default function ChatArea(props: ChatAreaProps) {
  const avatar = useAuthStore((state) => state.avatar);
  const messages = useChatStore((state) => {
    const user = state.chats.find((user) => user.username === props.username);
    if (!user) return [];
    else
      return user.messages.map((message) => {
        if (message.bySender) {
          return { ...message, avatar: props.avatar };
        } else {
          return { ...message, avatar };
        }
      });
  });
  return (
    <>
      <ChatTopBar
        username={props.username}
        avatar={props.avatar}
        status={props.status}
        setCurrentName={props.setCurrentName}
      />
      <MessageList data={messages} renderItem={MessageItem} />
      <ChatActionBar username={props.username} />
    </>
  );
}
