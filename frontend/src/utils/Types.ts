type SignUpSuccessResponse = {
  success: true;
  username: string;
  avatar: string;
  token: string;
};

type SignInSuccessResponse = {
  success: true;
  username: string;
  avatar: string;
  token: string;
};

type LogoutSuccessResponse = {
  success: true;
};

type AddUserSuccessResponse = {
  success: true;
  username: string;
  avatar: string;
};

type FailedResponse = {
  success: false;
  msg: string;
};

export type Message = {
  bySender: boolean;
  type: string;
  message: string;
  date: number;
};

export type SignUpResponse = SignUpSuccessResponse | FailedResponse;
export type LogoutResponse = LogoutSuccessResponse | FailedResponse;
export type SignInResponse = SignInSuccessResponse | FailedResponse;
export type AddUserResponse = AddUserSuccessResponse | FailedResponse;
export type AvatarResponse = {
  success: true;
  avatar: string;
};
export type TextMessageSocketResponse = {
  user: string;
  text: string;
  date: number;
};
export type ImageMessageSocketResponse = {
  user: string;
  image: string;
  date: number;
};
