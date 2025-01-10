import { User } from "../../../types/index";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "../../ui/textarea";
import { Input } from "../../ui/input";
import { Label } from "@/components/ui/label";
import OccupationSelect from "@/components/shared/occupationSelect";
// import profile from ".."; // Remove this incorrect import

type UserAboutProps = {
  profile: User;
  isEditing: Boolean;
  setIsEditing: (isEditing: boolean) => void;
  handleChange: (key: keyof User, value: string) => void;
  handleSkillsChange: (value: string) => void;
  saveProfile: () => void;
};

const occupations = [
  { id: 1, name: "Software Developer" },
  { id: 2, name: "Designer" },
  { id: 3, name: "Project Manager" },
];

const handleSkillsChange = (value: string) => {
  // handle occupation change logic here
};

export default function UserAboutCard({
  profile,
  isEditing,
  setIsEditing,
  handleChange,
  handleSkillsChange,
  saveProfile,
}: UserAboutProps) {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>
          {profile.role == 0 ? "About Me" : "About The Organization"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e: any) => handleChange("bio", e.target.value)}
              />
            </div>
            <div>
              <OccupationSelect
                occupations={occupations}
                selectedOccupations={profile.skills ?? []}
                onChange={handleSkillsChange}
              />
            </div>
          </>
        ) : (
          <>
            <p>{profile.bio}</p>
            <div>
              <strong>Skills:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {(profile.skills ?? []).map((skill) => (
                  <span
                    key={skill}
                    className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
              {/* <OccupationSelect
              occupations={occupations}
              selectedOccupations={profile.skills ?? []}
              onChange={handleOccupationChange} */}
              {/* /> */}
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
