"use client";

import { useState } from "react";
import AboutCard from "./user-about-card";
import UserInformation from "./user-information-card";
import { User } from "../../types/user";

type UserProfileProps = {
  user: User;
};

export default function ProfilePage({ user }: UserProfileProps) {
  const [profile, setProfile] = useState<User>(user);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (key: keyof User, value: string) => {
    // setProfile((prev) => ({ ...prev, [key]: value }));
    setProfile({
      _id: "1",
      name: "hila",
      email: "hila@gmail.com",
      bio: "hila is bla bla bla",
      skills: ["react", "java"],
      location: "kfar saba",
      avatar: "url",
    });
  };

  const handleSkillsChange = (value: string) => {
    // setProfile((prev) => ({
    //   ...prev,
    //   skills: value.split(",").map((skill) => skill.trim()),
    // }));
  };

  const saveProfile = () => {
    console.log("Saving profile:", profile);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <UserInformation
          profile={profile}
          isEditing={isEditing}
          changeProfile={setProfile}
          handleChange={handleChange}
        />
        <AboutCard
          profile={profile}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleChange={handleChange}
          handleSkillsChange={handleSkillsChange}
          saveProfile={saveProfile}
        />
      </div>
    </div>
  );
}
