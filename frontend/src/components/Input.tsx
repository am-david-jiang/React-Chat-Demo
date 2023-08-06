import styled from "styled-components";

interface IInputStyleProps {
  displayBlock: boolean;
  isSmall: boolean;
}

export interface IInputProps {
  displayBlock?: boolean;
  state: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  isSmall?: boolean;
}

const InputComponent = styled.input.attrs((props) => ({
  type: props.type || "text",
}))<IInputStyleProps>`
  display: ${(props) => (props.displayBlock ? "block" : "inline")};
  width: 100%;
  background-color: #fafafa;
  color: #202020;
  border: 1px solid #c9c9c9;
  border-radius: 16px;
  outline: none;

  padding: ${(props) => (props.isSmall ? "0.75rem 1rem" : "1rem 1.25rem")};
  font-size: ${(props) => (props.isSmall ? "0.875rem" : "1rem")};
  line-height: ${(props) => (props.isSmall ? "1.25rem" : "1.5rem")};
  font-weight: 500;

  &::placeholder {
    color: #6d6d6d;
  }

  &:focus {
    background-color: white;
    border-color: #1570ef;
  }
`;

export default function Input(props: IInputProps) {
  return (
    <InputComponent
      displayBlock={props.displayBlock || true}
      value={props.state}
      onChange={props.handleChange}
      placeholder={props.placeholder}
      type={props.type}
      isSmall={props.isSmall ? props.isSmall : false}
    />
  );
}
