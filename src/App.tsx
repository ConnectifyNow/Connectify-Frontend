import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import useUserStore from "./stores/setUserStore";
import { useEffect } from "react";
import useSkillsStore from "./stores/setSkillsStore";
import useCitiesStore from "./stores/setCitiesStore";
import useFocusAreaStore from "./stores/setFocusAreas";
import useChatStore from "./stores/setChatStore";
import { isAuthenticated } from "./services/authService";

export default function App() {
  const user = useUserStore();
  const skills = useSkillsStore();
  const chats = useChatStore();
  const cities = useCitiesStore();
  const focusAreas = useFocusAreaStore();

  useEffect(() => {
    user.resetUser();
    skills.fetchSkills();
    cities.fetchCities();

    focusAreas.fetchFocusArea();

    if (isAuthenticated()) {
      console.log("fetching chats");
      chats.fetchChats();
    }
  }, []);

  return <RouterProvider router={router} />;
}
