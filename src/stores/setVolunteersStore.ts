import { create } from "zustand";
import { Volunteer } from "@/types";
import { getVolunteers } from "@/services/volunteerService";
import useSkillsStore from "./setSkillsStore";

interface VolunteerStore {
  volunteers: Volunteer[];
  pages: number;
  fetchVolunteers: (page: number, limit: number) => Promise<void>;
}

const useVolunteersStore = create<VolunteerStore>((set) => ({
  volunteers: [],
  pages: 0,

  fetchVolunteers: async (page = 1, limit = 10) => {
    try {
      const skills = useSkillsStore.getState().skills;
      const response = await getVolunteers(page, limit);

      const simpleVolunteers = response.data.volunteers;

      const volunteers = simpleVolunteers.map((simpleVolunteer) => {
        const volunteerSkills = simpleVolunteer.skills.map((skillId) =>
          skills.find((skill) => skill._id === skillId)
        );
        const filteredVolunteerSkills = volunteerSkills.filter(
          (skill) => skill !== undefined
        );

        return {
          ...simpleVolunteer,
          skills: filteredVolunteerSkills
        };
      });

      set({ volunteers, pages: response.data.pages });
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    }
  }
}));

export default useVolunteersStore;
