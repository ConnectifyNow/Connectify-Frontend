import { ImageUpload } from "@/components/home/imageUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import useCitiesStore from "@/stores/setCitiesStore";
import { City, ProfileData, Role } from "../../../types/index";

type UserInformationProps = {
  profile: ProfileData;
  setProfile: (profile: ProfileData) => void;
  isEditing: boolean;
};

export default function UserInformation({
  profile,
  setProfile,
  isEditing
}: UserInformationProps) {
  const cities = useCitiesStore((state) => state.cities);
  const ProfileDataCity = cities?.find((city) => city._id === profile.city);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {profile.role == Role.Volunteer
            ? "Volunteer Information"
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
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      name: e.target.value
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={profile.username}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      username: e.target.value
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      email: e.target.value
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select
                  onValueChange={(e) => {
                    setProfile({
                      ...profile,
                      city: e
                    });
                  }}
                  required
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        ProfileDataCity?.name
                          ? `${ProfileDataCity.name}`
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
                <ImageUpload
                  preview={profile.imageUrl ?? ""}
                  setPreview={(e) => {
                    setProfile({
                      ...profile,
                      imageUrl: e
                    });
                  }}
                />
              </CardContent>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p>
                <strong>Name:</strong> {profile.name}
              </p>
              <p>
                <strong>Username:</strong> {profile.username}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>City:</strong> {ProfileDataCity?.name}
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src={profile.imageUrl}
                alt={profile.username}
                width={"50%"}
                height={"60%"}
                className="rounded-full mr-4"
                style={{ marginRight: "0" }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
