import defaultAvatar from "../assets/avatar.png";

export const getAvatarUrl = (avatar: string) => {
  if (!avatar) {
    return defaultAvatar;
  } else {
    return `http://localhost:5000/avatar/${avatar}`;
  }
};

export const getImageUrl = (image: string) => {
  return `http://localhost:5000/image/${image}`;
};
