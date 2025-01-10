import "./index.css";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
