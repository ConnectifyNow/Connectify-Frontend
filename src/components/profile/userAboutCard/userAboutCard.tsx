import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getAiDescription } from "@/services/aiService";
import useSkillsStore from "@/stores/setSkillsStore";
import useUserStore from "@/stores/setUserStore";
import { useEffect, useState } from "react";
import { ProfileData, Role, User } from "../../../types/index";
import { Textarea } from "../../ui/textarea";

type UserAboutProps = {
  profile: ProfileData;
  setProfile: (profile: ProfileData) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  saveProfile: () => void;
  handleLogout: () => void;
  setUser: (user: User) => void;
};

export default function UserAboutCard({
  profile,
  setProfile,
  isEditing,
  setIsEditing,
  saveProfile,
  setUser,
  handleLogout,
}: UserAboutProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [coolDownTime, setCoolDownTime] = useState(0);
  const getSkillById = useSkillsStore((state) => state.getSkillById);
  const profileSkills = profile.skills?.map((skill: any) =>
    getSkillById(skill)
  );

  const user = useUserStore.getState();
  setUser(user);

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

  const handleClick = async (profile: ProfileData) => {
    const response = await getAiDescription(profile.username);
    profile.about = response.data.description;
    setIsDisabled(true);
    setCoolDownTime(20);
    return response.data.description;
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>
          {profile?.role === Role.Volunteer
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
                value={profile?.about}
                onChange={(event) =>
                  setProfile({ ...profile, about: event.target.value })
                }
              />
            </div>
            {profile?.role === Role.Organization && (
              <Button
                onClick={async () => {
                  const fromAI = await handleClick(profile);
                  setProfile({ ...profile, about: fromAI });
                }}
                disabled={isDisabled}
                className="w-55 bg-blue-900 hover:bg-blue-900 hover:shadow-md"
              >
                {isDisabled
                  ? `Wait ${coolDownTime}s`
                  : "Generate Description using AI"}
              </Button>
            )}
          </>
        ) : (
          <>
            <div style={{ wordWrap: "break-word" }}>{profile.about}</div>
            <div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(profileSkills ?? [])?.map((skill) => (
                  <span
                    key={skill?._id}
                    className="text-primary-foreground px-2 py-1 rounded-full bg-green-600 text-sm"
                  >
                    {skill?.name}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
        <div className="flex justify-end space-x-2">
          {isEditing ? (
            <Button
              className="bg-blue-900 hover:bg-blue-900 hover:shadow-md"
              onClick={saveProfile}
            >
              Save Profile
            </Button>
          ) : (
            <Button
              className="bg-blue-900 hover:bg-blue-900 hover:shadow-md"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
