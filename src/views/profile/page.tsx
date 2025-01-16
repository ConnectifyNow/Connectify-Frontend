import UserAboutCard from "@/components/profile/userAboutCard/userAboutCard";
import UserInformation from "@/components/profile/userInformationCard/userInformationCard";
import PostsList from "@/components/profile/userPostsLists/user-posts-list";
import { logout, resetTokens } from "@/services/authService";
import useSkillsStore from "@/stores/setSkillsStore";
import useUserStore from "@/stores/setUserStore";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ProfileData, Role, User } from "../../types/index";

export default function ProfilePage() {
  const user = useUserStore();
  const navigate = useNavigate();
  const logoutMutation = useMutation(logout);
  const getSkillById = useSkillsStore((state) => state.getSkillById);
  const toggleSkill = useUserStore((state) => state.toggleSkill);

  const [profile, setProfile] = useState<User>(user);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (key: keyof ProfileData, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSkillsChange = (value: string) => {
    const skill = getSkillById(value);

    if (skill !== undefined) {
      toggleSkill(skill);
    }
  };

  const handleLogout = async () => {
    if (user.isLoggedIn) {
      await logoutMutation.mutateAsync();
      resetTokens();
      user.resetUser();
      navigate("/");
    }
  };

  const saveProfile = () => {
    setIsEditing(false);
  };

  let profileData = {} as ProfileData;

  if (user?.role === Role.Volunteer && user.volunteer) {
    profileData = {
      ...user.volunteer,
      name: `${user.volunteer?.firstName} ${user.volunteer?.lastName}`,
      role: Role.Volunteer,
      email: user.email,
      username: user.username
    };
  } else if (user?.role === Role.Organization && user.organization) {
    profileData = {
      ...user.organization,
      role: Role.Organization,
      email: user.email,
      about: user.organization.description,
      username: user.username
    };
  }

  return (
    <div className="bg-gray-100 px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <UserInformation
          profileData={profileData}
          isEditing={isEditing}
          handleChange={handleChange}
        />
        <UserAboutCard
          profileData={profileData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleChange={handleChange}
          handleSkillsChange={handleSkillsChange}
          handleLogout={handleLogout}
          saveProfile={saveProfile}
        />
      </div>
      <div className="grid grid-cols-3 md:grid-cols-1 gap-8">
        <PostsList />
      </div>
    </div>
  );
}
