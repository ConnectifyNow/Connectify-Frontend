import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProfilePage from "./profile";
import { User } from "@/types/user";

const initialProfile: User = {
  _id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  bio: "Passionate web developer with 5 years of experience. Always eager to learn and contribute to meaningful projects.",
  skills: ["React", "Node.js", "TypeScript", "Python"],
  location: "San Francisco, CA",
  avatar: "JD",
};

export function Navbar() {
  return (
    <Router>
      <div>
        {/* Navigation Links */}
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
                <Button variant="outline" className="ml-4">
                  Sign In
                </Button>
                <Button className="ml-2">Sign Up</Button>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route
            path="/profile"
            element={<ProfilePage user={initialProfile} />}
          />
        </Routes>
      </div>
    </Router>
  );
}
