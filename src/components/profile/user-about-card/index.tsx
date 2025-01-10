import { User } from "../../../types/user";
import { Button } from "@/components/ui/button";
import { Card } from '@/components/ui/card'
import { Textarea } from '@components/ui/card/textarea'
import { CardHeader } from '@components/ui/card/cardHeader'
import { CardTitle } from '@components/ui/card/cardTitle'
import { CardContent } from '@components/ui/card/cardContent'
import { Label } from '@components/ui/card/label'
import { Input } from '@components/ui/card/input'

type UserAboutProps = {
  profile: User;
  isEditing: Boolean;
  changeIsEditing: (isEditing: Boolean) => void;
  handleChange: (key: keyof User, value: string) => void;
  handleSkillsChange: (value: string) => void;
  saveProfile: () => void; 
};

export default function UserAboutCard({ profile, isEditing, changeIsEditing ,handleChange, handleSkillsChange, saveProfile}: UserAboutProps) {

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
                  <Textarea id="bio" value={profile.bio} onChange={(e:any) => handleChange('bio', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input id="skills" value={profile.skills.join(', ')} onChange={(e: any) => handleSkillsChange(e.target.value)} />
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
                <Button onClick={() => changeIsEditing(true)}>Edit Profile</Button>
              )}
            </div>
          </CardContent>
        </Card>
        )