import { useParams } from "next/navigation";

export const useWorkspaceId = () => {
  const params = useParams<{ id: string }>();

  return params.id;
};
