import { ProfileData, Role } from "../../../types/index";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "../../ui/textarea";
import { Label } from "@/components/ui/label";
import axios from "axios";
import CustomSelect from "@/components/shared/customSelect";
import OpenAI from "openai";
import { useEffect, useState } from "react";
import { getAiDescription } from "@/services/aiService";

type UserAboutProps = {
  profileData: ProfileData;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  handleChange: (key: keyof ProfileData, value: string) => void;
  handleSkillsChange: (value: number) => void;
  saveProfile: () => void;
};

const skills = [
  { id: 1, name: "Software Developer" },
  { id: 2, name: "Designer" },
  { id: 3, name: "Project Manager" },
];

export default function UserAboutCard({
  profileData,
  isEditing,
  setIsEditing,
  handleChange,
  handleSkillsChange,
  saveProfile,
}: UserAboutProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isDisabled && cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (cooldownTime === 0) {
      setIsDisabled(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isDisabled, cooldownTime]);

  const handleClick = async (profileData: ProfileData) => {
    // profileData.about = await generateDescription(profileData.username);
    const response = await getAiDescription(profileData.username);
    profileData.about = response.data.description;
    setIsDisabled(true);
    setCooldownTime(20);
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
                className="w-55">
                {isDisabled
                  ? `Wait ${cooldownTime}s`
                  : "Generate Description using AI"}
              </Button>
            )}

            <div>
              <CustomSelect
                options={skills}
                selectedOptions={
                  profileData.skills?.map((skill) => skill.id) ?? []
                }
                onChange={handleSkillsChange}
              />
            </div>
          </>
        ) : (
          <>
            <p>{profileData.about}</p>
            <div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(profileData.skills ?? []).map((skill) => (
                  <span
                    key={skill.id}
                    className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
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
