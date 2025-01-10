import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User } from "../../../types/user";
import { Label } from "@/components/ui/label";

type UserInformationProps = {
  profile: User;
  isEditing: Boolean;
  changeProfile: (profile: User) => void;
  handleChange: (key: keyof User, value: string) => void;
};

export default function UserInformation({
  profile,
  isEditing,
  handleChange,
}: UserInformationProps) {
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
              {/* <Label htmlFor="name">Name</Label> */}
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
