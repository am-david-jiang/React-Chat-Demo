import styled from "styled-components";

export interface IMessagesListProps<T> {
  data?: Array<T>;
  renderItem: (item: T) => React.ReactNode;
  // loading: () => React.ReactNode | React.ReactNode;
  // default: () => React.ReactNode | React.ReactNode;
}

const MessageListStyled = styled.ul`
  flex: 1;
  width: 100%;
  padding: 0.75rem 1.25rem;
  gap: 0.75rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  overflow: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0.25rem;
  }

  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.5) rgba(0, 0, 0, 0.1);
`;

export default function MessageList<T>(props: IMessagesListProps<T>) {
  return (
    <MessageListStyled>
      {/* <MessageItem {...propsForList} isSender={true} />
      <MessageItem {...propsForList} isSender={false} /> */}
      {props.data?.map((message) => props.renderItem(message))}
    </MessageListStyled>
  );
}
