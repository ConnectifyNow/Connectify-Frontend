"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import useUserStore from "@/stores/setUserStore";
import CustomSelect from "../../../components/shared/customSelect";

const cities = [
  { id: 1, name: "New York" },
  { id: 2, name: "Los Angeles" },
  { id: 3, name: "Chicago" },
];

const areas = [
  { id: 1, name: "Education" },
  { id: 2, name: "Healthcare" },
  { id: 3, name: "Environment" },
  { id: 4, name: "Social Services" },
  { id: 5, name: "Arts and Culture" },
  { id: 6, name: "Community Development" },
];

export default function OrganizationSignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    city: "",
    description: "",
    imageUrl: "",
    organizationUrl: "",
    areas: [] as string[],
  });
  const router = useNavigate();
  const user = useUserStore();

  useEffect(() => {
    const email = localStorage.getItem("signupEmail");
    const password = localStorage.getItem("signupPassword");
    if (email && password) {
      setFormData((prev) => ({ ...prev, email, password }));
    }
  }, []);

  const generateDescription = (organizationName: string) => {
    console.log({ generateDescription: organizationName });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAreaChange = (value: string) => {
    setFormData((prev) => {
      const updatedAreas = prev.areas.includes(value)
        ? prev.areas.filter((area) => area !== value)
        : [...prev.areas, value];
      return { ...prev, areas: updatedAreas };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting organization data:", formData);
    user.setUser({
      id: "mock-id",
      username: "mock-username",
      email: formData.email,
      password: formData.password,
      role: 1,
      name: "mock-name",
    });
    router("/");
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
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <Label htmlFor="organizationUrl">Organization URL</Label>
              <Input
                id="organizationUrl"
                name="organizationUrl"
                type="url"
                value={formData.organizationUrl}
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
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id.toString()}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <CustomSelect
              options={areas}
              selectedOptions={formData.areas}
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
              size="sm"
              onClick={() => generateDescription("hilas company")}
            >
              Generate Description
            </Button>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Organization Logo URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full">
              Complete Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
