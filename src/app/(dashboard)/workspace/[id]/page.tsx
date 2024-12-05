import { getMembersByUserIdWorkspaceId } from "@/data/members";
import { getWorkspaceById } from "@/data/workspace";
import { session } from "@/lib/session";
import { redirect } from "next/navigation";

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

  if (!member) {
    return redirect("/");
  }

  return <div>{id}</div>;
};

export default WorkspacePage;
