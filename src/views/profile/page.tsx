import UserAboutCard from "@/components/profile/userAboutCard/userAboutCard";
import UserInformation from "@/components/profile/userInformationCard/userInformationCard";
import PostsList from "@/components/profile/userPostsLists/user-posts-list";
import { logout, resetTokens } from "@/services/authService";
import useUserStore from "@/stores/setUserStore";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ProfileData, Role } from "../../types/index";

export default function ProfilePage() {
  const user = useUserStore();
  const navigate = useNavigate();
  const logoutMutation = useMutation(logout);

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
  }, []);

  const handleLogout = async () => {
    if (user.isLoggedIn) {
      await logoutMutation.mutateAsync();
      resetTokens();
      user.resetUser();
      navigate("/");
    }
  };

  const saveProfile = () => {
    //do query to DB
    // const handleEditProfile = async (profile: ProfileData) => {
    //   const profileToUpdate = {
    //     ...profileData,
    //     name: name,
    //     username: username,
    //     city: city?.name,
    //     imageUrl: image,
    //     email: email,
    //   };

    //   //   const response = await updatePostApi(postToUpdate);

    //   //   if (response.status === 200) {
    //   //     updatePost(post);
    //   //   } else {
    //   //     console.error("Failed to update post:", response.statusText);
    //   //   }
    //   // };

    // };
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
