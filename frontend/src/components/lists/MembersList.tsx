import styled from "styled-components";

// import Avatar from "../../assets/avatar.png";

export interface IMembersListProps<T, U extends Function> {
  data?: Array<T>;
  action: U;
  renderItem: (props: T & { action: U }) => React.ReactNode;
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

export default function MembersList<T, U extends Function>(
  props: IMembersListProps<T, U>
) {
  return (
    <MembersListStyled>
      {props.data?.map((member) =>
        props.renderItem({ ...member, action: props.action })
      )}
    </MembersListStyled>
  );
}
