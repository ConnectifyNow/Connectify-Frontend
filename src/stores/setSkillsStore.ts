import { create } from "zustand";
import { Skill } from "@/types";
import { getSkills } from "@/services/skillsService";

interface SkillsStore {
  skills: Skill[];
  fetchSkills: () => Promise<void>;
  getSkillById: (id: string) => Skill | undefined;
}

const useSkillsStore = create<SkillsStore>((set, get) => ({
  skills: [],
  fetchSkills: async () => {
    try {
      const response = await getSkills();
      const skills = response.data;
      set({ skills });
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    }
  },
  getSkillById: (id: string) => {
    const skills = get().skills;
    const skill = skills.find((skill) => skill._id === id);
    return skill ?? undefined;
  }
}));

export default useSkillsStore;
