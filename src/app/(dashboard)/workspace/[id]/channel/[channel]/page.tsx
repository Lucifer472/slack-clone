import { redirect } from "next/navigation";

import { getChannelById } from "@/data/channels";
import { getMemberByUserIdWorkspaceId } from "@/data/members";

import { session } from "@/lib/session";

import { Header } from "@/features/channels/header";
import { ChatInput } from "@/features/channels/chat-input";

const ChannelPage = async ({
  params,
}: {
  params: Promise<{ id: string; channel: string }>;
}) => {
  const { channel, id } = await params;

  const channelData = await getChannelById(parseInt(channel));
  const user = await session();

  if (!channelData || !user || channelData.workspaceId !== id) {
    return redirect("/");
  }

  const member = await getMemberByUserIdWorkspaceId({
    userId: user.id,
    workspaceId: id,
  });

  if (!member) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col h-full">
      <Header
        name={channelData.name}
        id={channel}
        workspaceId={id}
        isAdmin={member.role === "ADMIN"}
      />
      <div className="flex-1"></div>
      <ChatInput placeholder={"Message # " + channelData.name} />
    </div>
  );
};

export default ChannelPage;
