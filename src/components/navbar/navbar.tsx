import { Button } from "@/components/ui/button";
import lightBulbIcon from "@/assets/light-bulb.svg";
import "./navbar.css";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src={lightBulbIcon} alt="Light Bulb Icon" className="icon" />
              <span className="text-2xl font-bold text-primary">
                Connectify
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/filter"
              className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Find Help
            </Link>
            <Link
              to="/chat"
              className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Chat
            </Link>
            <Link
              to="/profile"
              className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Profile
            </Link>
            <Link to="/signin">
              <Button variant="outline" className="ml-4">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="ml-2">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}