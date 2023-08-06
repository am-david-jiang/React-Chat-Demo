import styled from "styled-components";

interface IAvatarProp {
  src: string;
  alt?: string;
  size?: number;
  offline?: boolean;
}

const AvatarStyled = styled.img<{ size?: number; offline?: boolean }>`
  display: block;
  width: ${(props) => (props.size ? `${props.size}px` : "auto")};
  height: ${(props) => (props.size ? `${props.size}px` : "auto")};
  border-radius: 50%;
  filter: grayscale(${(props) => (props.offline ? 1 : 0)});
`;

export default function Avatar(props: IAvatarProp) {
  return (
    <AvatarStyled
      offline={props.offline}
      size={props.size}
      src={props.src}
      alt={props.alt}
    />
  );
}
