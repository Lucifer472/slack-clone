"use client";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Quill from "quill";
import { toast } from "sonner";

import { useCreateMessage } from "@/features/message/api/use-create-message";
import { useGetMessage } from "../message/api/use-get-message";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

export const ChatInput = ({
  placeholder,
  workspaceId,
  channelId,
}: {
  placeholder: string;
  workspaceId: string;
  channelId?: number;
}) => {
  const [editorKey, setEditorKey] = useState(0);
  const editorRef = useRef<Quill | null>(null);

  const { mutate, isPending } = useCreateMessage();

  const { data } = useGetMessage({
    queryParams: { page: "1", channelId: channelId?.toString() },
  });

  if (data) {
    console.log(data.data[0]);
  }

  const handleSubmit = async ({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) => {
    let ImageAdded: string | undefined;

    if (image) {
      const validTypes = ["image/jpeg", "image/png", "image/svg+xml"];
      if (!validTypes.includes(image.type)) {
        alert("Only JPG, PNG, and SVG files are allowed.");
        return;
      }

      const maxSize = 500 * 1024;
      if (image.size > maxSize) {
        alert("File size must be less than 500kb.");
        return;
      }

      // Wrap FileReader in a Promise to wait for it to complete
      ImageAdded = await new Promise<string | undefined>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result as string);
        };

        reader.onerror = () => {
          alert("Failed to read file!");
          reject(undefined);
        };

        reader.readAsDataURL(image);
      });
    }

    mutate(
      {
        json: {
          body,
          workspaceId,
          channelId,
          image: ImageAdded,
        },
      },
      {
        onSuccess: () => {
          toast.success("Message sent successfully!");
          setEditorKey((prev) => prev + 1);
        },
      }
    );
  };

  return (
    <div className="px-5 w-full">
      <Editor
        key={editorKey}
        placeholder={placeholder}
        onSubmit={handleSubmit}
        disabled={isPending}
        innerRef={editorRef}
      />
    </div>
  );
};
