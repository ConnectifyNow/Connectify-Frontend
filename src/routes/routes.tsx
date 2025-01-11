import { createBrowserRouter, redirect } from "react-router-dom";
import Onboarding from "@/views/onboarding/page";
import Filter from "@/views/filter/page";
import Chat from "@/views/chat/page";

import Home from "@/views/home/page";
import ProfilePage from "@/components/profile";
import SignUpModePage from "@/views/signup/mode/page";
import UserSignUpPage from "@/views/signup/user/page";
import OrganizationSignUpPage from "@/views/signup/organization/page";
import SignInPage from "@/views/signIn/page";
import SignUpPage from "@/views/signup/page";
import Layout from "@/components/layout/layout";
import { getTokens } from "@/services/authService";

const authLoader = async () => {
  const tokens = getTokens();
  if (tokens.accessToken && tokens.refreshToken) {
    return null;
  }
  return redirect("/signin");
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: authLoader,
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
        path: "/signin",
        element: <SignInPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/signup/mode",
        element: <SignUpModePage />,
      },
      {
        path: "/signup/user",
        element: <UserSignUpPage />,
      },
      {
        path: "/signup/organization",
        element: <OrganizationSignUpPage />,
      },
      {
        path: "/chat",
        element: <Chat />
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/profile",
<<<<<<< Updated upstream
        element: <ProfilePage />
      }
    ]
  }
=======
        element: <ProfilePage />,
      },
      {
        path: "/discover",
        element: <DiscoverPage />,
      },
    ],
  },
  {
    path: "/chat",
    element: <Chat />,
  },
>>>>>>> Stashed changes
]);
