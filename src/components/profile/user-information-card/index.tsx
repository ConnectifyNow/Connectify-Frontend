import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User } from "../../../types/user";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserInformationProps = {
  profile: User;
  changeProfile: (profile: User) => void;
};

export default function UserInformation({
  profile,
  changeProfile,
}: UserInformationProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (key: keyof User, value: string) => {
    // changeProfile((prev) => ({ ...prev, [key]: value }));
    changeProfile({
      name: "hila",
      email: "hila@gmail.com",
      bio: "hila is bla bla bla",
      skills: ["react", "java"],
      location: "kfar saba",
      avatar: "url",
    });
  };

  const handleSkillsChange = (value: string) => {
    changeProfile((prev) => ({
      ...prev,
      skills: value.split(",").map((skill) => skill.trim()),
    }));
  };

  const saveProfile = () => {
    console.log("Saving profile:", profile);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Avatar className="w-32 h-32 text-4xl">
            <AvatarFallback>{profile.avatar}</AvatarFallback>
          </Avatar>
        </div>
        {isEditing ? (
          <>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e: any) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e: any) => handleChange("email", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e: any) => handleChange("location", e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>Location:</strong> {profile.location}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
