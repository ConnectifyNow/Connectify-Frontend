import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useUserStore from "@/stores/setUserStore";
import { useMutation } from "react-query";
import { useToast } from "../../hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { signin, saveTokens, googleSignIn } from "../../services/authService";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

export default function SignInPage() {
  const { toast } = useToast();

  const updateIsLoggedIn = useUserStore((state) => state.updateIsLoggedIn);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserStore();
  const router = useNavigate();

  const onGoogleSigninSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      const response = await googleSignIn(credentialResponse);
      const { data: loginGoogleRes } = response;

      saveTokens({
        accessToken: loginGoogleRes.accessToken,
        refreshToken: loginGoogleRes.refreshToken,
      });
      user.setUser(loginGoogleRes.user);
      updateIsLoggedIn(true);

      router("/home", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const onGoogleSigninFailure = () => {
    toast({
      title: "Sorry, we have an issue logging in via Google",
      action: (
        <ToastAction altText="Sorry, we have an issue logging in via Google">
          login error
        </ToastAction>
      ),
    });
  };

  const signinMutation = useMutation(
    ({ username, password }: { username: string; password: string }) =>
      signin(username, password)
  );

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await signinMutation.mutateAsync({
        username,
        password,
      });

      if (response.data.accessToken !== "") {
        saveTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
        user.setUser(response.data.user);
        updateIsLoggedIn(true);
      }

      router("/home");
    } catch {
      setError("Failed to sign in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-8 flex justify-center items-center min-h-screen bg-blue-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Sign In to Connectify
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 hover:shadow-md"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
            <GoogleLogin
              onSuccess={onGoogleSigninSuccess}
              onError={onGoogleSigninFailure}
            />
          </form>
          <div className="mt-4 text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
