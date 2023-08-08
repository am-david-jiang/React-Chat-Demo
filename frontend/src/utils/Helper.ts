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

export const throttle = (
  func: (e: React.SyntheticEvent) => void,
  interval: number
) => {
  let timestamp = Date.now();

  return function (e: React.SyntheticEvent) {
    const now = Date.now();

    if (now - timestamp >= interval) {
      func(e);
      timestamp = now;
    }
  };
};
