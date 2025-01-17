import { ImageUpload } from "@/components/home/imageUpload";
import CustomSelect from "@/components/shared/customSelect";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { saveTokens, signin, signup } from "@/services/authService";
import { createVolunteer } from "@/services/volunteerService";
import useCitiesStore from "@/stores/setCitiesStore";
import useSkillsStore from "@/stores/setSkillsStore";
import useUserStore from "@/stores/setUserStore";
import { Role, Volunteer } from "@/types";
import { useState } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

export default function UserSignUpPage() {
  const location = useLocation();
  const cities = useCitiesStore((state) => state.cities);
  const skills = useSkillsStore((state) => state.skills);
  const [image, setImage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    username: location.state.username,
    password: location.state.password,
    firstName: "",
    lastName: "",
    city: "",
    age: 0,
    skills: [] as string[],
    imageUrl: "",
    about: "",
    phone: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserStore();
  const router = useNavigate();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (value: string) => {
    setFormData((previous) => ({
      ...previous,
      skills: previous.skills.includes(value)
        ? previous.skills.filter((o) => o !== value)
        : [...previous.skills, value]
    }));
  };

  const signUpMutation = useMutation(
    ({
      username,
      password,
      role,
      email
    }: {
      username: string;
      password: string;
      role: number;
      email?: string;
    }) => signup(username, password, role, email)
  );

  const signinMutation = useMutation(
    ({ username, password }: { username: string; password: string }) =>
      signin(username, password)
  );

  const createVolunteerMutation = useMutation(createVolunteer);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const signUpResponse = await signUpMutation.mutateAsync({
        username: formData.username,
        password: formData.password,
        role: Role.Volunteer,
        email: formData.email
      });
      const createdUser = signUpResponse.data;

      const loginResponse = await signinMutation.mutateAsync({
        username: formData.username,
        password: formData.password
      });

      if (loginResponse.data.accessToken !== "") {
        saveTokens({
          accessToken: loginResponse.data.accessToken,
          refreshToken: loginResponse.data.refreshToken
        });

        const volunteerResponse = await createVolunteerMutation.mutateAsync({
          ...formData,
          imageUrl: image,
          userId: loginResponse.data.user._id
        });

        setImage("");
        const simpleVolunteer = volunteerResponse.data;
        const volunteer: Volunteer = {
          ...simpleVolunteer,
          skills: skills.filter((skill) =>
            simpleVolunteer.skills.includes(skill._id)
          )
        };

        createdUser.volunteer = volunteer;
        user.setUser(createdUser);
        user.updateIsLoggedIn(true);

        router("/home");
      }
    } catch {
      setError("Failed to complete sign-up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Complete Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select
                onValueChange={(value) => handleSelectChange("city", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  {cities?.map((city) => (
                    <SelectItem key={city._id} value={city._id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="skills" style={{ marginTop: "30px" }}>
                Skills
              </Label>
              <CustomSelect
                options={skills}
                selectedOptions={formData.skills}
                onChange={handleSkillChange}
              />
            </div>
            <div>
              <Label style={{ marginTop: "30px" }} htmlFor="websiteLink">
                Image
              </Label>
              <ImageUpload preview={image} setPreview={setImage} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about">About</Label>
              <Textarea
                id="about"
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Completing Sign Up..." : "Complete Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
