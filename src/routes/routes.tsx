import { createBrowserRouter } from "react-router-dom";
import Onboarding from "@/views/onboarding/page";
import Filter from "@/views/filter/page";
import Chat from "@/views/chat/page";
import Home from "@/views/home/page";
import RootLayout from "@/RootLayout";

// const authLoader = async () => {
//   const tokens = getTokens();
//   if (tokens.accessToken && tokens.refreshToken) {
//     return null;
//   }
//   return redirect("/login");
// };

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Onboarding />
      },
      {
        path: "/filter",
        element: <Filter />
      },
      {
        path: "/chat",
        element: <Chat />
      },
      {
        path: "/home",
        element: <Home />
      },
    ]
  }
]);
