import { User } from "../../../types/index";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "../../ui/textarea";
import { Input } from "../../ui/input";
import { Label } from "@/components/ui/label";

type UserAboutProps = {
  profile: User;
  isEditing: Boolean;
  setIsEditing: (isEditing: boolean) => void;
  handleChange: (key: keyof User, value: string) => void;
  handleSkillsChange: (value: string) => void;
  saveProfile: () => void;
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
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Input
                id="skills"
                value={profile?.skills?.join(", ")}
                onChange={(e: any) => handleSkillsChange(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <p>{profile.bio}</p>
            <div>
              <strong>Skills:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile?.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm"
                  >
                    {skill}
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
