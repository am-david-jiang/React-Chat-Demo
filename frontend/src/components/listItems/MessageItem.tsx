import moment from "moment";
import styled, { ThemeProvider } from "styled-components";

import { fontSize, fontWeight, lineHeight } from "../../utils/Theme";
import Avatar from "../Avatar";

export interface IMessageProps {
  avatar: string;
  message: string;
  date: number;
  bySender: boolean;
  type: string;
}

const MessageStyled = styled.div<{ sender: boolean }>`
  display: flex;
  gap: 1rem;
  align-self: ${(props) => (props.sender ? "flex-start" : "flex-end")};

  & > img {
    order: ${(props) => (props.sender ? -1 : 1)};
  }
`;

const MessageContentStyled = styled.div<{ sender: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.sender ? "flex-start" : "flex-end")};
  gap: 0.5rem;
`;

const MessageBubbleStyled = styled.div<{ sender: boolean }>`
  background-color: ${(props) =>
    props.sender ? "#d0d5dd" : "hsl(215, 87%, 51%)"};
  color: ${(props) => (props.sender ? "#101828" : "white")};
  padding: 0.625rem 1rem;
  border-radius: ${(props) =>
    props.sender ? "0 8px 8px 8px" : "8px 0 8px 8px"};
  font-size: ${(props) => props.theme.fontSize.md};
  line-height: ${(props) => props.theme.lineHeight.md};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  max-width: 20em;
`;

const MessageImageBubbleStyled = styled.img`
  width: 100%;
  height: 100%;
  max-height: 200px;
  max-width: 200px;
`;

const MessageDateStyled = styled.p`
  font-size: ${(props) => props.theme.fontSize.sm};
  line-height: ${(props) => props.theme.lineHeight.sm};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #667085;
`;

export default function Message(props: IMessageProps) {
  let messageContent: string | React.ReactNode;

  switch (props.type) {
    case "image":
      messageContent = (
        <MessageImageBubbleStyled
          src={props.message}
          alt={`Message Image ${props.message}`}
        />
      );
      break;
    case "text":
    default:
      messageContent = props.message;
      break;
  }

  return (
    <MessageStyled sender={props.bySender}>
      <Avatar src={props.avatar} alt='Avatar' size={42} />
      <MessageContentStyled sender={props.bySender}>
        <ThemeProvider theme={{ fontSize, lineHeight, fontWeight }}>
          <MessageBubbleStyled sender={props.bySender}>
            {/* {props.message} */}
            {messageContent}
          </MessageBubbleStyled>
          <MessageDateStyled>{moment(props.date).calendar()}</MessageDateStyled>
        </ThemeProvider>
      </MessageContentStyled>
    </MessageStyled>
  );
}
