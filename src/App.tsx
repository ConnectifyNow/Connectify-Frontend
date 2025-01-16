import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import useUserStore from "./stores/setUserStore";
import { useEffect } from "react";
import useSkillsStore from "./stores/setSkillsStore";
import useCitiesStore from "./stores/setCitiesStore";
import useFocusAreaStore from "./stores/setFocusAreas";

export default function App() {
  const user = useUserStore();
  const skills = useSkillsStore();
  const cities = useCitiesStore();
  const focusAreas = useFocusAreaStore();

  useEffect(() => {
    user.resetUser();
    skills.fetchSkills();
    cities.fetchCities();
    focusAreas.fetchFocusArea();
  }, []);

  return <RouterProvider router={router} />;
}
