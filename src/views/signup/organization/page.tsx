import { useState, useEffect } from "react";
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
import { ImageIcon } from "lucide-react";
import useUserStore from "@/stores/setUserStore";
import CustomSelect from "../../../components/shared/customSelect";
import { getAiDescription } from "@/services/aiService";
import { useMutation } from "react-query";
import { saveTokens, signin, signup } from "@/services/authService";
import { createOrganization } from "@/services/organizationService";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Organization, Role } from "@/types";
import useCitiesStore from "@/stores/setCitiesStore";
import useFocusAreaStore from "@/stores/setFocusAreas";

export default function OrganizationSignUpPage() {
  const location = useLocation();
  const cities = useCitiesStore((state) => state.cities);
  const areas = useFocusAreaStore((state) => state.focusAreas);

  const [formData, setFormData] = useState({
    email: location.state.email,
    password: location.state.password,
    name: "",
    city: "",
    description: "",
    imageUrl: "",
    websiteLink: "",
    focusAreas: [] as string[],
  });
  const router = useNavigate();
  const user = useUserStore();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [logo, setLogo] = useState("");

  // const generateDescription = (organizationName: string) => {
  //   console.log({ generateDescription: organizationName });
  // };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result); // Store image base64 in state for preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAreaChange = (value: string) => {
    setFormData((prev) => {
      const updatedAreas = prev.focusAreas.includes(value)
        ? prev.focusAreas.filter((area) => area !== value)
        : [...prev.focusAreas, value];
      return { ...prev, focusAreas: updatedAreas };
    });
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

  const createOrganizationMutation = useMutation(createOrganization);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const signUpResponse = await signUpMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
        role: Role.Organization,
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

        const organizationResponse =
          await createOrganizationMutation.mutateAsync({
            ...formData,
            imageUrl: logo,
            userId: loginResponse.data.user._id,
          });

        const simpleOrganization = organizationResponse.data;
        const organization: Organization = {
          ...simpleOrganization,
          focusAreas: areas.filter((focusArea) =>
            simpleOrganization.focusAreas.includes(focusArea._id)
          ),
        };

        createdUser.organization = organization;
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

  const [isDisabled, setIsDisabled] = useState(false);
  const [coolDownTime, setCoolDownTime] = useState(0);

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

  const handleGenerateClick = async () => {
    // profileData.about = await generateDescription(profileData.username);
    const response = await getAiDescription(formData.name);
    formData.description = response.data.description;
    setIsDisabled(true);
    setCoolDownTime(20);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Complete Your Organization Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="space-y-2">
              <Label htmlFor="name">Organization Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="websiteLink">Organization URL</Label>
              <Input
                id="websiteLink"
                name="websiteLink"
                type="url"
                value={formData.websiteLink}
                onChange={handleChange}
                placeholder="https://www.yourorganization.com"
                required
              />
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
            <CustomSelect
              options={areas}
              selectedOptions={formData.focusAreas}
              onChange={handleAreaChange}
            />
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>
            <Button
              onClick={() => handleGenerateClick()}
              disabled={isDisabled}
              className="w-55"
              style={{ width: "35%" }}
            >
              {isDisabled
                ? `Wait ${coolDownTime}s`
                : "Generate Description using AI"}
            </Button>

            <Label style={{ marginTop: "30px" }} htmlFor="websiteLink">
              Organization Logo
            </Label>
            <div
              className="flex flex-col items-center justify-center"
              style={{ marginTop: "2px" }}
            >
              <label
                htmlFor="logo"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                style={{ marginTop: "5px", minHeight: "140px" }}
              >
                {!logo && (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">
                        Click to upload organization logo
                      </span>
                    </p>
                  </div>
                )}
                {logo && (
                  <div className="mt-4" style={{ marginTop: "0" }}>
                    <img
                      src={logo}
                      style={{ maxHeight: "100px" }}
                      alt="Uploaded Preview"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </label>

              <input
                type="file"
                id="logo"
                accept="logo/*"
                className="hidden"
                onChange={handleLogoChange}
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
