import { ProfileData, Role } from "../../../types/index";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "../../ui/textarea";
import { Label } from "@/components/ui/label";
import CustomSelect from "@/components/shared/customSelect";
import { useEffect, useState } from "react";
import { getAiDescription } from "@/services/aiService";
import useSkillsStore from "@/stores/setSkillsStore";

type UserAboutProps = {
  profileData: ProfileData;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  handleChange: (key: keyof ProfileData, value: string) => void;
  handleSkillsChange: (value: string) => void;
  saveProfile: () => void;
  handleLogout: () => void;
};

export default function UserAboutCard({
  profileData,
  isEditing,
  setIsEditing,
  handleChange,
  handleSkillsChange,
  saveProfile,
  handleLogout
}: UserAboutProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [coolDownTime, setCoolDownTime] = useState(0);
  const skills = useSkillsStore((state) => state.skills);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isDisabled && coolDownTime > 0) {
      timer = setInterval(() => {
        setCoolDownTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (coolDownTime === 0) {
      setIsDisabled(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isDisabled, coolDownTime]);

  const handleClick = async (profileData: ProfileData) => {
    const response = await getAiDescription(profileData.username);
    profileData.about = response.data.description;
    setIsDisabled(true);
    setCoolDownTime(20);
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>
          {profileData.role === Role.Volunteer
            ? "About Me"
            : "About The Organization"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <div>
              <Label htmlFor="about">Description</Label>
              <Textarea
                id="about"
                value={profileData.about}
                onChange={(event) => handleChange("about", event.target.value)}
              />
            </div>
            {profileData.role === Role.Organization && (
              <Button
                onClick={() => handleClick(profileData)}
                disabled={isDisabled}
                className="w-55"
              >
                {isDisabled
                  ? `Wait ${coolDownTime}s`
                  : "Generate Description using AI"}
              </Button>
            )}

            {profileData.role === Role.Volunteer && (
              <div>
                <CustomSelect
                  options={skills}
                  selectedOptions={
                    profileData.skills?.map((skill) => skill._id) ?? []
                  }
                  onChange={handleSkillsChange}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <p>{profileData.about}</p>
            <div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(profileData.skills ?? []).map((skill) => (
                  <span
                    key={skill._id}
                    className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
        <div className="flex justify-end space-x-2">
          {isEditing ? (
            <Button onClick={saveProfile}>Save Profile</Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
