import { forwardRef, useState } from "react";
import styled from "styled-components";

import { throttle } from "../../utils/Helper";

export interface IMembersListProps<T, U extends Function> {
  data?: Array<T>;
  action: U;
  renderItem: (props: T & { action: U }) => React.ReactNode;
  itemHeight: number;
  containerHeight: number;
  // loading: () => React.ReactNode | React.ReactNode;
  // default: () => React.ReactNode | React.ReactNode;
}

const MembersListStyled = styled.ul`
  flex: 1;
  width: 100%;

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

// const propsForList = {
//   username: "David Jiang",
//   avatar: Avatar,
//   lastMessage:
//     "This is a text message for testing here This is a text message for testing here",
//   time: Date.now(),
//   unreadNum: 1,
// };

const VirtualizedMembersList = forwardRef(function <T, U extends Function>(
  props: IMembersListProps<T, U>,
  ref: React.ForwardedRef<HTMLUListElement>
) {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.floor(scrollTop / props.itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(props.containerHeight / props.itemHeight),
    props.data?.length || 0
  );
  const visibleItems = props.data?.slice(startIndex, endIndex) || [];
  const invisibleItemsHeight =
    (startIndex + visibleItems.length - endIndex) * props.itemHeight;
  const handleScroll = (e: React.SyntheticEvent) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <MembersListStyled onScroll={throttle(handleScroll, 10)} ref={ref}>
      <div style={{ width: "100%" }}>
        {props.data?.map((member) =>
          props.renderItem({ ...member, action: props.action })
        )}
      </div>
      <div style={{ height: `${invisibleItemsHeight}px` }} />
    </MembersListStyled>
  );
});

export default VirtualizedMembersList;
