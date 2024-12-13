import { format, isToday, isYesterday } from "date-fns";
import dynamic from "next/dynamic";

import { Hint } from "@/components/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Members, reactions, User } from "@/types";

import { Thumbnail } from "./thumbnail";

type MessageTextProps = {
  id: number;
  member: Members & {
    user: User;
  };
  reaction: reactions[];
  updatedAt: string;
  createdAt: string;
  isAuthor: boolean;
  body: string;
  image?: string | null;
  isEditing: boolean;
  isCompact?: boolean;
  setEditingId: (id: null | number) => void;
  threadCount?: number;
  threadImage?: string | null;
  threadTimestamp?: string | number;
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
  hideThreadButton,
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
          <div className="flex flex-col w-full">
            <Renderer value={body} />
            <Thumbnail url={image} />
            {updatedAt > createdAt && (
              <span className="text-xs text-muted-foreground">(edited)</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative">
      <div className="flex items-start gap-2">
        <button>
          <Avatar>
            <AvatarImage src={authorImage ?? undefined}></AvatarImage>
            <AvatarFallback>
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
          <Thumbnail url={image} />
          {updatedAt > createdAt && (
            <span className="text-xs text-muted-foreground">(edited)</span>
          )}
        </div>
      </div>
      {!isEditing && (
        <Toolbar
          isAuthor={isAuthor}
          isPending={false}
          handleEdit={() => setEditingId(id)}
          handleThread={() => {}}
          handleDelete={() => {}}
          hideThreadButton={hideThreadButton}
        />
      )}
    </div>
  );
};
