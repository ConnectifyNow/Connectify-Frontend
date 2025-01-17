import UserAboutCard from "@/components/profile/userAboutCard/userAboutCard";
import UserInformation from "@/components/profile/userInformationCard/userInformationCard";
import PostsList from "@/components/profile/userPostsLists/user-posts-list";
import { logout, resetTokens } from "@/services/authService";
import { updateOrganizationApi } from "@/services/organizationService";
import useUserStore from "@/stores/setUserStore";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ProfileData, Role, User } from "../../types/index";
import { updateVolunteerApi } from "@/services/volunteerService";

export default function ProfilePage() {
  const myUser = useUserStore.getState();
  const navigate = useNavigate();
  const logoutMutation = useMutation(logout);

  const [user, setUser] = useState<User>(myUser);
  const [profile, setProfile] = useState<ProfileData>({} as ProfileData);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user?.role === Role.Volunteer && user.volunteer) {
      setProfile({
        ...user.volunteer,
        name: `${user.volunteer?.firstName} ${user.volunteer?.lastName}`,
        role: Role.Volunteer,
        email: user.email,
        username: user.username,
        city: user?.volunteer.city,
        imageUrl: user?.volunteer.imageUrl,
        about: user.volunteer.about,
      });
    } else if (user?.role === Role.Organization && user.organization) {
      setProfile({
        ...user.organization,
        name: user.organization.name,
        role: Role.Organization,
        email: user.email,
        about: user.organization.description,
        username: user.username,
        city: user?.organization.city,
        imageUrl: user?.organization.imageUrl,
      });
    }
  }, [user]);

  const handleLogout = async () => {
    if (user.isLoggedIn) {
      await logoutMutation.mutateAsync();
      resetTokens();
      myUser.resetUser();
      navigate("/");
    }
  };

  const handleEditProfile = async () => {
    let response;
    if (profile?.role === Role.Volunteer && user.volunteer) {
      const profileToUpdate = {
        _id: user.volunteer?._id,
        city: profile?.city,
        name: profile?.name,
        about: profile?.about,
        imageUrl: profile?.imageUrl,
        email: profile?.email,
        // username: profile.username,
      };
      response = await updateVolunteerApi(profileToUpdate);
    } else if (user?.role === Role.Organization && user.organization) {
      const profileToUpdate = {
        _id: user.organization?._id,
        city: profile?.city,
        name: profile?.name,
        description: profile?.about,
        imageUrl: profile?.imageUrl,
        email: profile?.email,
        // username: profile.username,
      };

      response = await updateOrganizationApi(profileToUpdate);
    }
    if (response?.status === 200) {
      // updatePost(post);
    } else {
      console.error(
        "Failed to update user:",
        response?.statusText,
        response?.data
      );
    }
  };

  const saveProfile = () => {
    handleEditProfile();
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <UserInformation
          profile={profile}
          setProfile={setProfile}
          isEditing={isEditing}
          setUser={setUser}
        />
        <UserAboutCard
          profile={profile}
          setProfile={setProfile}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
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
