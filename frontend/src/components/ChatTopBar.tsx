import styled from "styled-components";

import Icon from "./icons/Icon";
import Avatar from "./Avatar";

import { fontSize, fontWeight, lineHeight } from "../utils/Theme";

export interface IChatTopBarProps {
  username: string;
  avatar: string;
  status: string;
  setCurrentName: React.Dispatch<React.SetStateAction<string>>;
}

const ChatTopBarStyled = styled.div`
  display: flex;
  width: 100%;
  padding: 1.25rem;
  align-items: center;
  gap: 1rem;
`;

const ChatTopBarInfoStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UsernameAndStatusStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > h1 {
    font-size: ${(props) => props.theme.fontSize.sm};
    line-height: ${(props) => props.theme.lineHeight.sm};
    font-weight: ${(props) => props.theme.fontWeight.semiBold};
  }

  & > p {
    color: #656565;
    font-size: ${(props) => props.theme.fontSize.xs};
    line-height: ${(props) => props.theme.lineHeight.xs};
    font-weight: ${(props) => props.theme.fontWeight.regular};
  }
`;

export default function ChatTopBar(props: IChatTopBarProps) {
  return (
    <ChatTopBarStyled>
      <Icon size={24} icon='back' onClick={() => props.setCurrentName("")} />
      <ChatTopBarInfoStyled>
        <Avatar
          size={36}
          src={props.avatar}
          alt='Receiver Avatar'
          offline={props.status === "Offline"}
        />
        <UsernameAndStatusStyled theme={{ fontSize, fontWeight, lineHeight }}>
          <h1>{props.username}</h1>
          <p>{props.status}</p>
        </UsernameAndStatusStyled>
      </ChatTopBarInfoStyled>
    </ChatTopBarStyled>
  );
}
