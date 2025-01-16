import { isAuthenticated } from "@/services/authService";
import { Skill, User, Volunteer } from "@/types";
import { create } from "zustand";

const initialState: User = {} as User;

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
  setUser: (user: User) => {
    set(() => ({ ...user }));
    localStorage.setItem("user", JSON.stringify(user));
  },
  resetUser: () => {
    const user = localStorage.getItem("user");

    if (user) {
      set(() => JSON.parse(user));
    } else {
      set(() => ({ ...initialState }));
    }
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
