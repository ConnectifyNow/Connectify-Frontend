import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useUserStore from "@/stores/setUserStore";
import CustomSelect from "@/components/shared/customSelect";
import { Role, Volunteer } from "@/types";
import { saveTokens, signin, signup } from "@/services/authService";
import { createVolunteer } from "@/services/volunteerService";
import { useMutation } from "react-query";
import useSkillsStore from "@/stores/setSkillsStore";
import useCitiesStore from "@/stores/setCitiesStore";
import { ImageIcon } from "lucide-react";

export default function UserSignUpPage() {
  const location = useLocation();
  const cities = useCitiesStore((state) => state.cities);
  const skills = useSkillsStore((state) => state.skills);

  const [formData, setFormData] = useState({
    email: location.state.email,
    password: location.state.password,
    firstName: "",
    lastName: "",
    city: "",
    age: 0,
    skills: [] as string[],
    imageUrl: "",
    about: "",
    phone: "",
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
        : [...previous.skills, value],
    }));
  };

  const signUpMutation = useMutation(
    ({
      email,
      password,
      role,
    }: {
      email: string;
      password: string;
      role: number;
    }) => signup(email, password, role)
  );

  const signinMutation = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      signin(email, password)
  );

  const createVolunteerMutation = useMutation(createVolunteer);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const signUpResponse = await signUpMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
        role: Role.Volunteer,
      });
      const createdUser = signUpResponse.data;

      const loginResponse = await signinMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
      });

      if (loginResponse.data.accessToken !== "") {
        saveTokens({
          accessToken: loginResponse.data.accessToken,
          refreshToken: loginResponse.data.refreshToken,
        });

        const volunteerResponse = await createVolunteerMutation.mutateAsync({
          ...formData,
          userId: loginResponse.data.user._id,
        });

        const simpleVolunteer = volunteerResponse.data;
        const volunteer: Volunteer = {
          ...simpleVolunteer,
          skills: skills.filter((skill) =>
            simpleVolunteer.skills.includes(skill._id)
          ),
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
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <CustomSelect
              options={skills}
              selectedOptions={formData.skills}
              onChange={handleSkillChange}
            />
            <div>
              <Label htmlFor="websiteLink">Profile image</Label>
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                style={{ marginTop: "5px" }}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageIcon className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                </div>
              </label>
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
