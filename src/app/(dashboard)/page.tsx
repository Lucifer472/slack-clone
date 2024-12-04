"use client";

import { useEffect, useMemo } from "react";

import { useRouter } from "next/navigation";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";

const Homepage = () => {
  const { data, isPending } = useGetWorkspaces();
  const { open, setOpen } = useWorkspaceModal();

  const router = useRouter();

  const workspaceId = useMemo(() => data?.data?.[0]?.id, [data]);

  useEffect(() => {
    if (isPending) return;

    if (workspaceId) {
      router.replace("/workspace/" + workspaceId);
    } else if (!open) {
      setOpen(true);
    }
  }, [isPending, open, setOpen, workspaceId, router]);

  return <div></div>;
};

export default Homepage;
