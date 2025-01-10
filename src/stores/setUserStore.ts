import { User } from "@/types";
import { create } from "zustand";

const initialState: User = {
  id: "",
  name: "",
  email: "",
  password: "",
  role: undefined,
  avatar: "",
  bio: "blab lbabablbablalabla",
  location: " kfar saba",
  skills: ["java", "react"],
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
