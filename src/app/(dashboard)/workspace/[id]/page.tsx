import { redirect } from "next/navigation";

import { getChannelsByWorkspaceId } from "@/data/channels";
import { getMembersByUserIdWorkspaceId } from "@/data/members";
import { getWorkspaceById } from "@/data/workspace";

import { session } from "@/lib/session";

import { Workspace } from "@/features/workspaces/workspace";

const WorkspacePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const user = await session();

  if (!user) {
    return redirect("/sign-in");
  }

  const workspace = await getWorkspaceById({ id });

  if (!workspace) {
    return redirect("/");
  }

  const member = await getMembersByUserIdWorkspaceId({
    userId: user.id,
    workspaceId: id,
  });

  const channels = await getChannelsByWorkspaceId({ workspaceId: id });

  if (!member || !channels) {
    return redirect("/");
  }

  if (channels && channels.length > 0) {
    return redirect("/workspace/" + id + "/channel/" + channels[0].id);
  }

  return <Workspace member={member} />;
};

export default WorkspacePage;
