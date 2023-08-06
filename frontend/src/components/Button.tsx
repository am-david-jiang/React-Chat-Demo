import styled from "styled-components";

interface IButtonStyleProps {
  displayFullWidth: boolean;
  outline?: boolean;
}

export interface IButtonProps {
  displayFullWidth?: boolean;
  text: string;
  icon?: string;
  outline?: boolean;
  handleClick: (e: React.SyntheticEvent) => void;
}

const ButtonComponent = styled.div<IButtonStyleProps>`
  background-color: ${(props) => (props.outline ? "white" : "#1570EF")};
  color: ${(props) => (props.outline ? "#1570EF" : "white")};
  border: 2px solid #1570ef;
  border-radius: 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;

  width: ${(props) => (props.displayFullWidth ? "100%" : "auto")} & > img {
    width: auto;
    height: 24px;
  }

  & > p {
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.5;
    text-align: center;
  }

  &:hover {
    cursor: pointer;
    background-color: #1570ef;
    color: white;
  }
`;

export default function Button(props: IButtonProps) {
  return (
    <ButtonComponent
      displayFullWidth={props.displayFullWidth || false}
      onClick={props.handleClick}
      outline={props.outline}
    >
      {props.icon && <img src={props.icon} />}
      <p>{props.text}</p>
    </ButtonComponent>
  );
}
