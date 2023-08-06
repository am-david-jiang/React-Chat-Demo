import styled from "styled-components";

const IconButtonStyled = styled.img<{ width?: number }>`
  width: ${(props) => (props.width ? `${props.width}px` : "auto")};
  height: ${(props) => (props.width ? `${props.width}px` : "auto")};
`;

export default function IconButton() {
  return <IconButtonStyled />;
}
