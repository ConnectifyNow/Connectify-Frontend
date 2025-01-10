import { createBrowserRouter } from "react-router-dom";
import Onboarding from "@/views/onboarding/page";
import Filter from "@/views/filter/page";
import Chat from "@/views/chat/page";
import RootLayout from "@/RootLayout";
import ProfilePage from "@/components/profile";
import useUserStore from "@/stores/setUserStore";

// const authLoader = async () => {
//   const tokens = getTokens();
//   if (tokens.accessToken && tokens.refreshToken) {
//     return null;
//   }
//   return redirect("/login");
// };
const { user } = useUserStore();

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Onboarding />,
      },
      {
        path: "/filter",
        element: <Filter />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/profile",
        element: <ProfilePage user={user} />,
      },
    ],
  },
]);
