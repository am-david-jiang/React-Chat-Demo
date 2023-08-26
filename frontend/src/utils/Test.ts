import Avatar from "../assets/avatar.png";

const propsForList = {
  username: "David Jiang",
  avatar: Avatar,
  lastMessage:
    "This is a text message for testing here This is a text message for testing here",
  time: Date.now(),
  unreadNum: 1,
};

const testMembers = new Array(100);

for (let i = 0; i < testMembers.length; i++) {
  const obj = Object.assign({}, propsForList);
  obj.username = `David Jiang${i}`;
  testMembers[i] = obj;
}

export { testMembers };
