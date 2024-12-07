import { VerificationCode } from "@/features/workspaces/verification-code";

const JoinPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ workspaceId: string }>;
  searchParams: Promise<{ joinCode?: string }>;
}) => {
  const { workspaceId } = await params;
  const { joinCode } = await searchParams;

  return <VerificationCode workspaceId={workspaceId} defaultCode={joinCode} />;
};

export default JoinPage;
