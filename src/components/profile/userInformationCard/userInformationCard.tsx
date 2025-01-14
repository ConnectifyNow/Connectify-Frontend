import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ProfileData, Role, User } from "../../../types/index";
import { randomAvatarUrl } from "@/utils/functions";

type UserInformationProps = {
  profileData: ProfileData;
  isEditing: boolean;
  changeProfile: (profile: User) => void;
  handleChange: (key: keyof ProfileData, value: string) => void;
};

export default function UserInformation({
  profileData,
  isEditing,
  handleChange,
}: UserInformationProps) {
  const router = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {profileData.role == Role.Volunteer
            ? "User Information"
            : "Organization Information"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Avatar className="w-32 h-32 text-4xl">
            <AvatarImage src={profileData.imageUrl ?? randomAvatarUrl()} />
          </Avatar>
        </div>
        {isEditing ? (
          <>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(event) => handleChange("name", event.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={profileData.username}
                onChange={(event) =>
                  handleChange("username", event.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(event) => handleChange("email", event.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profileData.city}
                onChange={(event) => handleChange("city", event.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {profileData.name}
            </p>
            <p>
              <strong>Username:</strong> {profileData.username}
            </p>
            <p>
              <strong>Email:</strong> {profileData.email}
            </p>
            <p>
              <strong>City:</strong> {profileData.city}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
