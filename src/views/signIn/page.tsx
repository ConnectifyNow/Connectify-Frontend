"use client";

import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Ensure this path is correct or update it to the correct path
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useUserStore from "@/stores/setUserStore";
import { useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import {
  signin as signinRequest,
  saveTokens,
  signin,
} from "../../services/authService";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserStore();
  const router = useNavigate();

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Signing in with:", { email, password });
      // user.setUser({
      //   id: "mock-id",
      //   name: "mock-name",
      //   username: "mock-username",
      //   email: email,
      //   password: password,
      //   // Add a random role for the user
      //   role: Math.floor(Math.random() * 1)
      // });

      const signinMutation = useMutation(
        ({ email, password }: { email: string; password: string }) =>
          signinRequest(email, password)
      );

      const signin = async () => {
        try {
          const { data: signinRes } = await signinMutation.mutateAsync({
            email,
            password,
          });
          saveTokens({
            accessToken: signinRes.accessToken,
            refreshToken: signinRes.refreshToken,
          });
          user.setUser(signinRes.user);
          toast.success("Logged in successfully");

          // Navigate("/profile");
        } catch (err) {
          toast.error("Incorrect email or password.\nPlease try again");
        }
      };

      router("/");
    } catch {
      setError(
        "Failed to sign in. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md" onChange={() => signin}>
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
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
