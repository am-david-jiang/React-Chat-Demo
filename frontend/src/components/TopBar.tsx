import styled from "styled-components";

import { getAvatarUrl } from "../utils/Helper";
import useAuthStore from "../stores/useAuthStore";
import { fontSize, fontWeight, lineHeight } from "../utils/Theme";

import Avatar from "./Avatar";
import Icon from "./icons/Icon";

type TopBarProps = {
  onClick: () => void;
};

const TopBarStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  margin-bottom: 1.25rem;
`;

const TopBarInfoStyled = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

const TitleStyled = styled.p`
  display: block;
  font-size: ${(props) => props.theme.fontSize.xl};
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
  line-height: ${(props) => props.theme.lineHeight.xl};
`;

const TextTheme = { fontSize, fontWeight, lineHeight };

export default function TopBar(props: TopBarProps) {
  const avatar = useAuthStore((state) => state.avatar);
  return (
    <TopBarStyled>
      <TopBarInfoStyled>
        <Avatar size={42} src={avatar} />
        <TitleStyled theme={TextTheme}>Chat</TitleStyled>
      </TopBarInfoStyled>
      <Icon icon='add' onClick={props.onClick} />
    </TopBarStyled>
  );
}
