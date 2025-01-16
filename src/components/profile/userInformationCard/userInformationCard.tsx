import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCitiesStore from "@/stores/setCitiesStore";
import { ProfileData, Role } from "../../../types/index";

type UserInformationProps = {
  profileData: ProfileData;
  isEditing: boolean;
  handleChange: (key: keyof ProfileData, value: string) => void;
};

export default function UserInformation({
  profileData,
  isEditing,
  handleChange,
}: UserInformationProps) {
  const cities = useCitiesStore((state) => state.cities);
  const ProfileDataCity = cities.find((city) => city._id === profileData.city);

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
            <AvatarImage
              src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                profileData.imageUrl
              }`}
            />
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
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select
                onValueChange={(event) => handleChange("city", event)}
                required
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      ProfileDataCity
                        ? `${ProfileDataCity?.name}`
                        : "Select A City"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {cities?.map((city) => (
                    <SelectItem key={city._id} value={city._id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <strong>City:</strong> {`${ProfileDataCity?.name}`}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
