import UserAboutCard from "@/components/profile/userAboutCard/userAboutCard";
import UserInformation from "@/components/profile/userInformationCard/userInformationCard";
import PostsList from "@/components/profile/userPostsLists/user-posts-list";
import { logout, resetTokens } from "@/services/authService";
import { updateOrganizationApi } from "@/services/organizationService";
import { updateUserApi } from "@/services/userService";
import { updateVolunteerApi } from "@/services/volunteerService";
import useUserStore from "@/stores/setUserStore";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ProfileData, Role, User } from "../../types/index";

export default function ProfilePage() {
  const myUser = useUserStore();
  const navigate = useNavigate();
  const logoutMutation = useMutation(logout);

  const [profile, setProfile] = useState<ProfileData>({} as ProfileData);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (myUser?.role === Role.Volunteer && myUser.volunteer) {
      setProfile({
        ...myUser.volunteer,
        name: myUser.volunteer?.firstName,
        role: Role.Volunteer,
        email: myUser.email,
        username: myUser.username,
        city: myUser?.volunteer.city,
        imageUrl: myUser?.volunteer.imageUrl,
        about: myUser.volunteer.about,
      });
    } else if (myUser?.role === Role.Organization && myUser.organization) {
      setProfile({
        ...myUser.organization,
        name: myUser.organization.name,
        role: Role.Organization,
        email: myUser.email,
        about: myUser.organization.description,
        username: myUser.username,
        city: myUser?.organization.city,
        imageUrl: myUser?.organization.imageUrl,
      });
    }
  }, [myUser]);

  const handleLogout = async () => {
    if (myUser.isLoggedIn) {
      await logoutMutation.mutateAsync();
      resetTokens();
      myUser.resetUser();
      navigate("/");
    }
  };

  const handleEditProfile = async () => {
    let response;
    try {
      if (profile.username !== myUser.username) {
        await updateUserApi({
          _id: myUser._id,
          username: profile.username,
        });
      }

      if (profile?.role === Role.Volunteer && myUser.volunteer) {
        const profileToUpdate = {
          _id: myUser.volunteer?._id,
          city: profile?.city,
          name: profile?.name,
          about: profile?.about,
          imageUrl: profile?.imageUrl,
          email: profile?.email,
        };
        response = await updateVolunteerApi(profileToUpdate);
      } else if (myUser?.role === Role.Organization && myUser.organization) {
        const profileToUpdate = {
          _id: myUser.organization?._id,
          city: profile?.city,
          name: profile?.name,
          description: profile?.about,
          imageUrl: profile?.imageUrl,
          email: profile?.email,
        };

        response = await updateOrganizationApi(profileToUpdate);
      }
      if (response?.status === 200) {
        console.log("user updated successfully");
        if (myUser?.role === Role.Organization && myUser.organization) {
          const newUser = {
            ...myUser,
            email: profile?.email,
            username: profile.username,
            organization: {
              ...myUser.organization,
              _id: myUser.organization._id,
              city: profile?.city ?? myUser.organization.city,
              name: profile?.name,
              description: profile?.about ?? myUser.organization.description,
              imageUrl: profile?.imageUrl,
            },
          };
          myUser.setUser(newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
        } else if (myUser.volunteer) {
          const newUser: User = {
            ...myUser,
            email: profile?.email,
            username: profile.username,
            volunteer: {
              ...myUser.volunteer,
              _id: myUser.volunteer._id,
              city: profile?.city ?? myUser.volunteer.city,
              firstName: profile?.name,
              about: profile?.about ?? myUser.volunteer.about,
              imageUrl: profile?.imageUrl,
            },
          };
          myUser.setUser(newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
        }
      } else {
        console.error(
          "Failed to update user:",
          response?.statusText,
          response?.data
        );
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const saveProfile = () => {
    handleEditProfile();
    setIsEditing(false);
  };

  return (
    <div className="px-4 py-8 bg-blue-50">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <UserInformation
          profile={profile}
          setProfile={setProfile}
          isEditing={isEditing}
        />
        <UserAboutCard
          profile={profile}
          setProfile={setProfile}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleLogout={handleLogout}
          saveProfile={saveProfile}
          setUser={(newUser: User) => {
            useUserStore.setState(newUser);
          }}
        />
      </div>
      <div className="grid grid-cols-3 md:grid-cols-1 gap-8">
        <PostsList />
      </div>
    </div>
  );
}
