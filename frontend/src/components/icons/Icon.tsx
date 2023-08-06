import React from "react";
import styled from "styled-components";

import _AddIcon from "./_AddIcon";
import _BackIcon from "./_BackIcon";
import _ImageIcon from "./_ImageIcon";
import _SendIcon from "./_SendIcon";

type IconProps = {
  onClick?: (e: React.SyntheticEvent) => void;
  icon: string;
};

export type _IconProps = {
  color: string;
  size: number;
};

const IconStyled = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export default function Icon(props: IconProps & Partial<_IconProps>) {
  let Component: (props: _IconProps) => JSX.Element;
  const size = props.size || 28;
  const color = props.color || "#464646";

  switch (props.icon) {
    case "add":
      Component = _AddIcon;
      break;
    case "back":
      Component = _BackIcon;
      break;
    case "image":
      Component = _ImageIcon;
      break;
    case "send":
      Component = _SendIcon;
      break;
    default:
      Component = _AddIcon;
  }

  return (
    <IconStyled onClick={props.onClick}>
      <Component size={size} color={color} />
    </IconStyled>
  );
}
