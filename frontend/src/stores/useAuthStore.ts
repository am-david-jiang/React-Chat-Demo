import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getAvatarUrl } from "../utils/Helper";

interface State {
  username: string;
  avatar: string;
  token: string;
  isLogin: boolean;
}

interface Action {
  login: (payload: LoginPayload) => void;
  logout: () => void;
}

interface LoginPayload {
  username: string;
  avatar: string;
  token: string;
}

const AuthStore = devtools<State & Action>((set) => ({
  username: "",
  avatar: "",
  token: "",
  isLogin: false,
  login: (payload: LoginPayload) =>
    set({
      username: payload.username,
      avatar: getAvatarUrl(payload.avatar),
      token: payload.token,
      isLogin: true,
    }),
  logout: () =>
    set({
      username: "",
      avatar: "",
      token: "",
      isLogin: false,
    }),
}));

const useAuthStore = create(AuthStore);

export default useAuthStore;

export type { LoginPayload };
