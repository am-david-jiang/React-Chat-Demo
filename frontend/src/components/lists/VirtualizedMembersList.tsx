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

  // display: flex;
  // flex-direction: column;
  // align-items: flex-start;
  position: relative;

  overflow-y: auto;

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
    Math.ceil((scrollTop + props.containerHeight) / props.itemHeight),
    props.data ? props.data.length : 0
  );
  const visibleItems = props.data?.slice(startIndex, endIndex) || [];
  const invisibleItemsHeight = props.data
    ? (props.data.length - endIndex) * props.itemHeight
    : 0;
  const upHeight = startIndex * props.itemHeight;
  const handleScroll = (e: React.SyntheticEvent) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  console.log(scrollTop, startIndex, endIndex, invisibleItemsHeight);

  return (
    <MembersListStyled
      onScroll={throttle(handleScroll, 10)}
      ref={ref}
      style={{ height: `${props.containerHeight}px` }}
    >
      <div style={{ height: `${upHeight}px` }}></div>
      {visibleItems.map((member) =>
        props.renderItem({ ...member, action: props.action })
      )}
      <div style={{ height: `${invisibleItemsHeight}px` }} />
    </MembersListStyled>
  );
});

export default VirtualizedMembersList;
