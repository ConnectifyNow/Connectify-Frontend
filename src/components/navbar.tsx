import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { FiHome } from "react-icons/fi";

export function Navbar() {
  const router = useNavigate();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">
                Connectify
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/home"
              className="flex items-center gap-2 text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              <FiHome />
              Home
            </Link>
            <Link
              to="/discover"
              className="flex items-center gap-2 text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              <RiCompassDiscoverLine />
              Discover
            </Link>
            <Link
              to="/chat"
              className="flex items-center gap-2 text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              <IoChatboxEllipses />
              Chat
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              <IoMdPerson />
              Profile
            </Link>
            <Button
              variant="outline"
              className="ml-4"
              onClick={() => router("/signin")}
            >
              Sign In
            </Button>
            <Button className="ml-2" onClick={() => router("/signup")}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
