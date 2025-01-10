import { Role, User } from "@/types";
import { create } from "zustand";

const initialState: User = {
  id: "",
  username: "hilaohana",
  email: "hila.ohana@example.com",
  password: "1234",
  role: Role.Volunteer,
  volunteer: {
    phone: "1234567890",
    firstName: "Hila",
    lastName: "Ohana",
    city: "Tel Aviv",
    age: 30,
    skills: [
      { id: 1, name: "React" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "TypeScript" }
    ],
    userId: "",
    about: "I am a software developer"
  },
  organization: {
    id: "123",
    city: "Tel Aviv",
    name: "Hila Ohana",
    description: "Software Developer",
    focusAreas: [],
    websiteLink: ""
  }
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
