import { User } from "@/types";
import { create } from "zustand";

const initialState: User = {
  id: "",
  username: "",
  email: "",
  password: "",
  role: 0
};

interface UserState {
  user: User;
  setUser: (user: User) => void;
  resetUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: initialState,
  setUser: (user: User) => set({ user }),
  resetUser: () => set({ user: initialState })
}));

export default useUserStore;
