import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { isAuthenticated } from "./services/authService";
import useUserStore from "./stores/setUserStore";
import { useEffect } from "react";

export default function App() {
  const user = useUserStore();

  useEffect(() => {
    user.updateIsLoggedIn(isAuthenticated());
  }, []);

  return <RouterProvider router={router} />;
}
