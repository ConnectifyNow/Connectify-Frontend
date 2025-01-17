import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { City, ProfileData, Role } from "../../../types/index";
import { ImageUpload } from "@/components/home/imageUpload";
import { useEffect, useState } from "react";
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
  handleSubmit: (updatedProfileData: ProfileData) => void;
};

export default function UserInformation({
  profileData,
  isEditing,
  handleSubmit,
}: UserInformationProps) {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState<City | undefined>(undefined);
  const [email, setEmail] = useState("");

  const cities = useCitiesStore((state) => state.cities);
  const ProfileDataCity = cities?.find((city) => city._id === profileData.city);

  useEffect(() => {
    setName(profileData.name);
    setUsername(profileData.username);
    setCity(ProfileDataCity);
    setImage(profileData.imageUrl ?? "");
    setEmail(profileData.email);
  }, [profileData]);

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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select
                  onValueChange={(e) => {
                    const selectedCity = cities?.find(
                      (city) => city.name === e
                    );
                    setCity(selectedCity);
                  }}
                  required
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={city ? `${city?.name}` : "Select A City"}
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
                <strong>Name:</strong> {name}
              </p>
              <p>
                <strong>Username:</strong> {username}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>City:</strong> {city?.name}
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                  profileData.imageUrl
                }`}
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
