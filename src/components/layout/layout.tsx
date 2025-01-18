import "../../index.css";
import { Navbar } from "@/components/navbar/navbar";
import { Outlet, useLocation } from "react-router-dom";

export default function RootLayout() {
  const location = useLocation();
  const isChatPage = location.pathname === "/chat";

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isChatPage ? "max-h-screen" : ""
      }`}
    >
      <Navbar />
      <Outlet />
    </div>
  );
}
