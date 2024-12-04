"use client";

import { useAuthScreen } from "./hooks/use-auth-screen";

import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";

export const AuthScreen = () => {
  const { state } = useAuthScreen();

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#5c3b58]">
      <div className="md:h-auto md:w-[428px]">
        {!state ? <SignInCard /> : <SignUpCard />}
      </div>
    </div>
  );
};
