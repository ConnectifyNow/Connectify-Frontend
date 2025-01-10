import { User } from "@/types";
import { create } from "zustand";

const initialState: User = {
  id: "",
  name: "hila ohana",
  email: "hila.ohana@example.com",
  password: "1234",
  //0 means organization, 1 means user
  role: undefined,
  avatar: "HI",
  bio: "Passionate web developer with 5 years of experience. Always eager to learn and contribute to meaningful projects.",
  skills: ["React", "Node.js", "TypeScript", "Python"],
  location: "kfar saba",
};

interface UserState {
  user: User;
  setUser: (user: User) => void;
  resetUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: initialState,
  setUser: (user: User) => set({ user }),
  resetUser: () => set({ user: initialState }),
}));

export default useUserStore;
