import { ProfileData } from "../../../types/index";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "../../ui/textarea";
import { Label } from "@/components/ui/label";
import CustomSelect from "@/components/shared/customSelect";

type UserAboutProps = {
  profileData: ProfileData;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  handleChange: (key: keyof ProfileData, value: string) => void;
  handleSkillsChange: (value: string) => void;
  saveProfile: () => void;
};

const skills = [
  { id: 1, name: "Software Developer" },
  { id: 2, name: "Designer" },
  { id: 3, name: "Project Manager" }
];

// const handleSkillsChange = (value: string) => {
//   // TODO: Implement handleSkillsChange
// };

export default function UserAboutCard({
  profileData,
  isEditing,
  setIsEditing,
  handleChange,
  handleSkillsChange,
  saveProfile
}: UserAboutProps) {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>
          {profileData.role == 0 ? "About Me" : "About The Organization"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <div>
              <Label htmlFor="about">Bio</Label>
              <Textarea
                id="about"
                value={profileData.about}
                onChange={(event) => handleChange("about", event.target.value)}
              />
            </div>
            <div>
              <CustomSelect
                options={skills}
                selectedOptions={
                  profileData.skills?.map((skill) => skill.name) ?? []
                }
                onChange={handleSkillsChange}
              />
            </div>
          </>
        ) : (
          <>
            <p>{profileData.about}</p>
            <div>
              <strong>Skills:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {(profileData.skills ?? []).map((skill) => (
                  <span
                    key={skill.id}
                    className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
        <div className="flex justify-end">
          {isEditing ? (
            <Button onClick={saveProfile}>Save Profile</Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
