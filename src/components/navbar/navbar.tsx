import { Button } from "@/components/ui/button";
import lightBulbIcon from "@/assets/light-bulb.svg";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import {
  MessageSquareText,
  Compass,
  House,
  UserPen,
  LucideIcon,
} from "lucide-react";
import useUserStore from "@/stores/setUserStore";

export function Navbar() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const location = useLocation();

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
            {isLoggedIn ? (
              <>
                <NavLink to="/home" icon={House}>
                  Home
                </NavLink>
                <NavLink to="/discover" icon={Compass}>
                  Discover
                </NavLink>
                <NavLink to="/chat" icon={MessageSquareText}>
                  Chat
                </NavLink>
                <NavLink to="/profile" icon={UserPen}>
                  Profile
                </NavLink>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="outline" className="ml-4">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="ml-2">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  to,
  icon: Icon,
  children,
}: {
  to: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
        isActive
          ? "text-primary bg-primary/10"
          : "text-gray-700 hover:text-primary"
      }`}>
      <Icon />
      {children}
    </Link>
  );
}
