import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

// const googleClientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;

const googleClientId = "1";

if (!googleClientId) {
  throw new Error("Google Client ID is not defined in environment variables");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
