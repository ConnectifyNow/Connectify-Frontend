import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SignUpModePage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const router = useNavigate();

  const handleModeSelection = async (mode: "user" | "organization") => {
    setError("");
    setIsLoading(true);

    try {
      router(`/signup/${mode}`, {
        state: {
          username: location.state.username,
          password: location.state.password
        }
      });
    } catch {
      setError("Failed to select mode. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 px-4 py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Choose Your Account Type
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button
            onClick={() => handleModeSelection("user")}
            className="w-full bg-blue-900 hover:bg-blue-900 hover:shadow-md"
            disabled={isLoading}
          >
            Sign Up as a Volunteer
          </Button>
          <Button
            onClick={() => handleModeSelection("organization")}
            className="w-full bg-blue-900 hover:bg-blue-900 hover:shadow-md"
            disabled={isLoading}
          >
            Sign Up as an Organization
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
