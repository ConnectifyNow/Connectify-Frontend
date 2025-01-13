import { isAuthenticated } from "@/services/authService";
import { Role, User } from "@/types";
import { create } from "zustand";

const initialState: User = {
  _id: "",
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
      { _id: "1", name: "React" },
      { _id: "2", name: "Node.js" },
      { _id: "3", name: "TypeScript" }
    ],
    userId: "",
    about: "I am a software developer"
  },
  organization: {
    userId: "123",
    city: "Tel Aviv",
    name: "Hila Ohana",
    description: "Software Developer",
    focusAreas: [],
    websiteLink: ""
  },
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
  resetUser: () => {
    set(() => ({ ...initialState }));
    set(() => ({ isLoggedIn: isAuthenticated() }));
  }
}));

export default useUserStore;
