import styled, { ThemeProvider } from "styled-components";
import moment from "moment";

import {
  avatarSize,
  fontSize,
  lineHeight,
  fontWeight,
} from "../../utils/Theme";
import Avatar from "../Avatar";
import { SetStateAction } from "react";

export interface IMemberListItemProps {
  username: string;
  avatar: string;
  lastMessage: string;
  unreadNum: number;
  time: number | null;
  status: string;
  action: React.Dispatch<SetStateAction<string>>;
}

const ListItemStyled = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  width: 100%;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const ListItemInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 0;
`;

const ListItemInfoUpStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & > h1 {
    font-size: ${(props) => props.theme.fontSize.sm};
    font-weight: ${(props) => props.theme.fontWeight.semiBold};
    line-height: ${(props) => props.theme.lineHeight.sm};
    text-overflow: ellipsis;
  }

  & > p {
    font-size: ${(props) => props.theme.fontSize.xs};
    font-weight: ${(props) => props.theme.fontWeight.regular};
    line-height: ${(props) => props.theme.lineHeight.xs};
    color: #646464;
  }
`;

const ListItemInfoDownStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;

  & > p {
    font-size: ${(props) => props.theme.fontSize.xs};
    font-weight: ${(props) => props.theme.fontWeight.regular};
    line-height: ${(props) => props.theme.lineHeight.xs};
    color: #646464;

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  & > div {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #f04438;

    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    color: white;
    font-size: 0.75rem;
    line-height: 0.75rem;
  }
`;

const theme = { fontSize, lineHeight, fontWeight, avatarSize };

export default function MemberListItem(props: IMemberListItemProps) {
  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    props.action(props.username);
  };

  return (
    <ListItemStyled key={props.username} onClick={handleClick}>
      <ThemeProvider theme={theme}>
        <Avatar
          size={parseInt(theme.avatarSize.lg)}
          src={props.avatar}
          alt={`avatar of user ${props.username}`}
          offline={props.status === "Offline"}
        />
        <ListItemInfoStyled>
          <ListItemInfoUpStyled>
            <h1>{props.username}</h1>
            <p>{props.time ? moment(props.time).calendar() : ""}</p>
          </ListItemInfoUpStyled>
          <ListItemInfoDownStyled>
            <p>{props.lastMessage}</p>
            <div style={{ display: props.unreadNum !== 0 ? "flex" : "none" }}>
              {props.unreadNum}
            </div>
          </ListItemInfoDownStyled>
        </ListItemInfoStyled>
      </ThemeProvider>
    </ListItemStyled>
  );
}
