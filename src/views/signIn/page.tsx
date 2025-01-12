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
import {
  signin as signinRequest,
  saveTokens,
  googleSignIn
} from "../../services/authService";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

export default function SignInPage() {
  const { toast } = useToast();

  const updateIsLoggedIn = useUserStore((state) => state.updateIsLoggedIn);
  const [email, setEmail] = useState("");
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
        refreshToken: loginGoogleRes.refreshToken
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
      )
    });
  };

  const signinMutation = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      signinRequest(email, password)
  );

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data: signinRes } = await signinMutation.mutateAsync({
        email,
        password
      });
      updateIsLoggedIn(true);
      saveTokens({
        accessToken: signinRes.accessToken,
        refreshToken: signinRes.refreshToken
      });
      user.setUser(signinRes.user);

      toast({
        title: "Logged in successfully",
        action: (
          <ToastAction altText="Logged in successfully">login</ToastAction>
        )
      });

      router("/home");
    } catch {
      setError("Failed to sign in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
            <Button type="submit" className="w-full" disabled={isLoading}>
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
