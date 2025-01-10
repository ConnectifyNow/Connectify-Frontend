import Layout from "@/components/layout/layout";
import ProfilePage from "@/views/profile/page";
import Chat from "@/views/chat/page";
import DiscoverPage from "@/views/discover/page";
import Filter from "@/views/filter/page";
import Home from "@/views/home/page";
import Onboarding from "@/views/onboarding/page";
import SignInPage from "@/views/signIn/page";
import SignUpModePage from "@/views/signup/mode/page";
import OrganizationSignUpPage from "@/views/signup/organization/page";
import SignUpPage from "@/views/signup/page";
import UserSignUpPage from "@/views/signup/user/page";
import { createBrowserRouter } from "react-router-dom";

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
    element: <Layout />,
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
        path: "/signin",
        element: <SignInPage />
      },
      {
        path: "/signup",
        element: <SignUpPage />
      },
      {
        path: "/signup/mode",
        element: <SignUpModePage />
      },
      {
        path: "/signup/user",
        element: <UserSignUpPage />
      },
      {
        path: "/signup/organization",
        element: <OrganizationSignUpPage />
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/profile",
        element: <ProfilePage />
      },
      {
        path: "/discover",
        element: <DiscoverPage />
      }
    ]
  },
  {
    path: "/chat",
    element: <Chat />
  }
]);
