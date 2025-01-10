"use client";

import { useState } from "react";
import AboutCard from "./user-about-card";
import UserInformation from "./user-information-card";
import { User } from "../../types/user";

const initialProfile: User = {
  name: "John Doe",
  email: "john.doe@example.com",
  bio: "Passionate web developer with 5 years of experience. Always eager to learn and contribute to meaningful projects.",
  skills: ["React", "Node.js", "TypeScript", "Python"],
  location: "San Francisco, CA",
  avatar: "JD",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<User>(initialProfile);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <UserInformation profile={profile} changeProfile={setProfile} />
        <AboutCard profile={profile} />
      </div>
    </div>
  );
}
