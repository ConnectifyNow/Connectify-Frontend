import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { randomAvatarUrl } from "@/utils/functions";
import { City, ProfileData, Role, User } from "../../../types/index";
import { ImageUpload } from "@/components/home/imageUpload";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCitiesStore from "@/stores/setCitiesStore";

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
  const [image, setImage] = useState("");
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
        {isEditing ? (
          <>
            <div>
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
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
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
                    {cities?.map((city: City) => (
                      <SelectItem key={city._id} value={city._id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <CardContent className="pt-6">
                <ImageUpload preview={image} setPreview={setImage} />
              </CardContent>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
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
            </div>
            <div className="flex justify-center">
              <img
                src={profileData.imageUrl ?? randomAvatarUrl()}
                alt={profileData.username}
                width={"60%"}
                height={"60%"}
                className="rounded-full mr-4"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
