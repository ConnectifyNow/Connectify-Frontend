import { createBrowserRouter } from "react-router-dom";
import Onboarding from "@/views/onboarding/page";
import Filter from "@/views/filter/page";
import Chat from "@/views/chat/page";
import RootLayout from "@/RootLayout";
import SignUpModePage from "@/components/signup/mode/page";
import UserSignUpPage from "@/components/signup/user/page";
import OrganizationSignUpPage from "@/components/signup/organization/page";
import SignInPage from "@/components/signIn/page";
import SignUpPage from "@/components/signup/page";

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
        path: "/signin",
        element: <SignInPage />
      },
      {
        path:'/signup',
        element:<SignUpPage />
      },
      {
        path:'/signup/mode',
        element:<SignUpModePage />
      },
      {
        path:'/signup/user',
        element:<UserSignUpPage />
      },
      {
        path:'/signup/organization',
        element:<OrganizationSignUpPage />
      },
      // {
      //   path: "/signup",
      //   element: <SignUpPage />,
      //   children:[
      //    {
      //       path:'/signup/user',
      //       element:<UserSignUpPage />
      //     },{
      //       path:'/signup/organization',
      //       element:<OrganizationSignUpPage />
      //     },
      //   ]
      // },
      {
        path: "/chat",
        element: <Chat />
      }
    ]
  }
]);