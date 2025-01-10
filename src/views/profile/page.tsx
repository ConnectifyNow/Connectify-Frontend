import { useState } from "react";
import { ProfileData, Role, User } from "../../types/index";
import useUserStore from "@/stores/setUserStore";
import UserInformation from "@/components/profile/userInformationCard/userInformationCard";
import UserAboutCard from "@/components/profile/userAboutCard/userAboutCard";

export default function ProfilePage() {
  const user = useUserStore();

  const [profile, setProfile] = useState<User>(user);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (key: keyof ProfileData, value: string) => {};

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

  let profileData = {} as ProfileData;

  if (user?.role === Role.Volunteer && user.volunteer) {
    profileData = {
      ...user.volunteer,
      name: `${user.volunteer?.firstName} ${user.volunteer?.lastName}`,
      role: Role.Volunteer,
      email: user.email
    };
  } else if (user?.role === Role.Organization && user.organization) {
    profileData = {
      ...user.organization,
      role: Role.Organization,
      email: user.email,
      about: user.organization.description
    };
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <UserInformation
          profileData={profileData}
          isEditing={isEditing}
          changeProfile={setProfile}
          handleChange={handleChange}
        />
        <UserAboutCard
          profileData={profileData}
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
