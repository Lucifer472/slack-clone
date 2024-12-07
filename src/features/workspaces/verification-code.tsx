"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import VerificationInput from "react-verification-input";

import { Button } from "@/components/ui/button";
import { useJoinWorkspace } from "./api/use-join-workspace";

export const VerificationCode = ({
  workspaceId,
  defaultCode,
}: {
  workspaceId: string;
  defaultCode?: string;
}) => {
  const [value, setValue] = useState(defaultCode ? defaultCode : "");
  const { mutate, isPending } = useJoinWorkspace();

  const handleComplete = () => {
    mutate({
      json: {
        joinCode: value,
        workspaceId,
      },
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-y-4 bg-white p-8 rounded-lg shadow-md">
      <Image src={"/next.svg"} alt="Logo" width={100} height={100} />
      <div className="flex flex-col gap-y-4 justify-center items-center max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold">Join Workspace</h1>
          <p className="text-md text-muted-foreground">
            Enter the Workspacecode to join
          </p>
        </div>

        <VerificationInput
          classNames={{
            container: "flex gap-x-2",
            character:
              "h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",
            characterInactive: "bg-muted ",
            characterFilled: "bg-white text-black",
            characterSelected: "bg-white text-black",
          }}
          value={value}
          onComplete={(e) => setValue(e)}
          autoFocus
          length={6}
        />
      </div>
      <div className="flex gap-x-4">
        <Button size={"lg"} variant={"outline"} asChild>
          <Link href={"/"}>Back to Home</Link>
        </Button>
        <Button
          size={"lg"}
          variant={"default"}
          disabled={isPending}
          onClick={handleComplete}
        >
          Join
        </Button>
      </div>
    </div>
  );
};
