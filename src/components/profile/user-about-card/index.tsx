import { User } from "../../../types/user";

type UserAboutProps = {
  profile: User;
};

export default function UserAboutCard({ profile }: UserAboutProps) {

return (
<Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" value={profile.bio} onChange={(e) => handleChange('bio', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input id="skills" value={profile.skills.join(', ')} onChange={(e) => handleSkillsChange(e.target.value)} />
                </div>
              </>
            ) : (
              <>
                <p>{profile.bio}</p>
                <div>
                  <strong>Skills:</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.skills.map(skill => (
                      <span key={skill} className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
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
        )