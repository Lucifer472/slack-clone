import { Hint } from "@/components/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Members, User } from "@prisma/client";
import { format, isToday, isYesterday } from "date-fns";
import dynamic from "next/dynamic";

type MessageTextProps = {
  id: number;
  member: Members & {
    user: User;
  };
  reaction: {
    id: number;
    workspaceId: string;
    updatedAt: Date;
    createdAt: Date;
    value: string;
    messageId: number;
    count: number;
    memberIds: number[];
  }[];
  updatedAt: Date;
  createdAt: Date;
  isAuthor: boolean;
  body: string;
  image?: string | null;
  isEditing: boolean;
  isCompact?: boolean;
  setEditingId: (id: null | number) => void;
  threadCount?: number;
  threadImage?: string | null;
  threadTimestamp?: Date | number;
  hideThreadButton?: boolean;
};

const Renderer = dynamic(() => import("@/components/renderer"), { ssr: false });

const formatFullTime = (date: Date) => {
  return `${
    isToday(date)
      ? "TODAY"
      : isYesterday(date)
      ? "YESTERDAY"
      : format(date, "MMM d, yyyy")
  } at ${format(date, "h:mm:ss a")}`;
};

export const MessageText = ({
  id,
  isAuthor,
  createdAt,
  member,
  reaction,
  updatedAt,
  body,
  image,
  isEditing,
  setEditingId,
  isCompact,
  threadCount,
  threadImage,
  threadTimestamp,
}: MessageTextProps) => {
  const authorName = member.user.name ?? "a";
  const authorImage = member.user.image;

  if (isCompact) {
    return (
      <div className="flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative">
        <div className="flex items-start gap-2">
          <Hint label={formatFullTime(new Date(createdAt))}>
            <button className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 w-[40px] leading-[22px] text-center hover:underline">
              {format(new Date(createdAt), "hh:mm")}
            </button>
          </Hint>
        </div>

        <Renderer value={body} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative">
      <div className="flex items-start gap-2">
        <button>
          <Avatar className="size-5 rounded-md mr-1">
            <AvatarImage
              className="rounded-md"
              src={authorImage ?? ""}
            ></AvatarImage>
            <AvatarFallback className="rounded-md bg-sky-500 text-white text-xs">
              {authorName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>
        <div className="flex flex-col w-full overflow-hidden">
          <div className="text-sm space-x-2">
            <button
              className="font-bold text-primary hover:underline"
              onClick={() => {}}
            >
              {authorName}
            </button>
            <Hint label={formatFullTime(new Date(createdAt))}>
              <button className="text-xs text-muted-foreground hover:underline">
                {format(new Date(createdAt), "h:mm a")}
              </button>
            </Hint>
          </div>
          <Renderer value={body} />
          {updatedAt > createdAt && (
            <span className="text-xs text-muted-foreground">(edited)</span>
          )}
        </div>
      </div>
    </div>
  );
};