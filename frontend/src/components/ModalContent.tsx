import React from "react";
import styled, { ThemeProvider } from "styled-components";

import { fontSize, lineHeight, fontWeight } from "../utils/Theme";

import Input from "./Input";
import Button from "./Button";

type ModalContentProps = {
  state: string;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  cancelAction: (e: React.SyntheticEvent) => void;
  okAction: (e: React.SyntheticEvent) => void;
};

const Content = styled.div`
  padding: 1rem;
  background-color: #e0f0ff;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    font-size: ${(props) => props.theme.fontSize.sm};
    line-height: ${(props) => props.theme.lineHeight.sm};
    font-weight: ${(props) => props.theme.fontWeight.regular};
    color: #1d2939;
  }
`;

const Action = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  gap: 1rem;
`;

const theme = { fontSize, lineHeight, fontWeight };

export default function ModalContent(props: ModalContentProps) {
  return (
    <ThemeProvider theme={theme}>
      <Content>
        <Form>
          <p>Enter the username and start the conversation</p>
          <Input
            state={props.state}
            handleChange={props.handleChange}
            type='text'
          />
        </Form>
        <Action>
          <Button
            text='Cancel'
            outline={true}
            handleClick={props.cancelAction}
          />
          <Button text='Add' handleClick={props.okAction} />
        </Action>
      </Content>
    </ThemeProvider>
  );
}
