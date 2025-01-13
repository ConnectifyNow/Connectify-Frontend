import { isAuthenticated } from "@/services/authService";
import { Role, Skill, User, Volunteer } from "@/types";
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
    skills: [],
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
  toggleSkill: (skill: Skill) => void;
};

const useUserStore = create<State & Action>((set, get) => ({
  ...initialState,
  updateIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
  setUser: (user: User) => set(() => ({ ...user })),
  resetUser: () => {
    set(() => ({ ...initialState }));
    set(() => ({ isLoggedIn: isAuthenticated() }));
  },
  toggleSkill: (skill) => {
    const currentSkills = get().volunteer?.skills;
    const currentVolunteer = get().volunteer;

    const isSkillExist = currentSkills?.some(
      (currentSkill) => currentSkill._id === skill._id
    );

    if (isSkillExist) {
      const updatedSkills =
        currentSkills?.filter(
          (currentSkill) => currentSkill._id !== skill._id
        ) ?? [];

      set(() => ({
        volunteer: {
          ...currentVolunteer,
          skills: updatedSkills
        } as Volunteer
      }));
    } else {
      const updatedSkills = currentSkills ? [...currentSkills, skill] : [skill];

      set(() => ({
        volunteer: {
          ...currentVolunteer,
          skills: updatedSkills
        } as Volunteer
      }));
    }
  }
}));

export default useUserStore;
