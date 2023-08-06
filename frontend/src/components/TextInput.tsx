import styled from "styled-components";

const TextInputStyled = styled.textarea`
  padding: 0.75rem;
  font-size: 1rem;
  line-height: 1.5rem;
  flex: 1 0 0;

  outline: none;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 8px;

  resize: none;

  &::placeholder {
    color: #646464;
  }

  &:focus {
    border: 1px solid #000;
  }
`;

interface ITextInputProps {
  state: string;
  handleChanged: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextInput(props: ITextInputProps) {
  return (
    <TextInputStyled
      placeholder='Type a message'
      rows={1}
      value={props.state}
      onChange={props.handleChanged}
    />
  );
}
