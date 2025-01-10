import { User } from "@/types";
import { create } from "zustand";

const initialState: User = {
  id: "",
  name: "hila ohana",
  username: "hilaohana",
  email: "hila.ohana@example.com",
  password: "1234",
  // 0 means organization, 1 means user
  role: undefined,
  avatar: "HI",
  bio: "Passionate web developer with 5 years of experience. Always eager to learn and contribute to meaningful projects.",
  skills: ["React", "Node.js", "TypeScript", "Python"],
  location: "kfar saba",
  isLoggedIn: false
};

type State = User;

type Action = {
  updateIsLoggedIn: (isLoggedIn: State["isLoggedIn"]) => void;
  setUser: (user: User) => void;
  resetUser: () => void;
};

const useUserStore = create<State & Action>((set) => ({
  ...initialState,
  updateIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
  setUser: (user: User) => set(() => ({ ...user })),
  resetUser: () => set(() => ({ ...initialState }))
}));

export default useUserStore;
