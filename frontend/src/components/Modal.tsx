import styled, { ThemeProvider } from "styled-components";
import { fontSize, lineHeight, fontWeight } from "../utils/Theme";

export interface IModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ModalBox = styled.div`
  font-family: "Inter", sans-serif;
  width: 600px;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
`;

const ModalTitle = styled.div`
  width: 100%;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: hsl(215, 87%, 51%);
`;

const ModalTitleH3 = styled.h3`
  font-size: ${(props) => props.theme.fontSize.xl};
  line-height: ${(props) => props.theme.lineHeight.xl};
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
  color: white;
`;

const theme = { fontSize, lineHeight, fontWeight };

export default function Modal({ title, children, isOpen }: IModalProps) {
  return (
    <ThemeProvider theme={theme}>
      <ModalOverlay isOpen={isOpen}>
        <ModalBox>
          <ModalTitle>
            <ModalTitleH3>{title}</ModalTitleH3>
          </ModalTitle>
          {children}
        </ModalBox>
      </ModalOverlay>
    </ThemeProvider>
  );
}
