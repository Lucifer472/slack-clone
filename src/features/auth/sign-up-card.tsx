"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useAuthScreen } from "./hooks/use-auth-screen";

export const SignUpCard = () => {
  const { setState } = useAuthScreen();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm-password") as string;

    if (password !== confirm || typeof password !== "string") {
      alert("Passwords do not match");
      return;
    }

    if (email && password) {
      console.log(email);
      console.log(password);
    }
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign Up to Continue</CardTitle>
        <CardDescription>
          Use you&apos;re email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={handleSignUp}>
          <Input
            disabled={false}
            type="email"
            placeholder="Email"
            name="email"
            required
          />
          <Input
            disabled={false}
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <Input
            disabled={false}
            type="password"
            placeholder="Confirm Password"
            name="confirm-password"
            required
          />
          <Button type="submit" className="w-full" size={"lg"} disabled={false}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={false}
            onClick={() => {}}
            variant={"outline"}
            size={"lg"}
            className="w-full relative"
          >
            <FcGoogle
              className="absolute top-2.5 left-2.5"
              style={{ width: "1.5rem", height: "1.5rem" }}
            />
            Continue with Google
          </Button>
          <Button
            disabled={false}
            onClick={() => {}}
            variant={"outline"}
            size={"lg"}
            className="w-full relative"
          >
            <FaGithub
              className="absolute top-2.5 left-2.5"
              style={{ width: "1.5rem", height: "1.5rem" }}
            />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an Account?{" "}
          <span
            onClick={() => setState(false)}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
