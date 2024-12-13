import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

/* eslint-disable @next/next/no-img-element */
export const Thumbnail = ({ url }: { url?: string | null }) => {
  if (!url) {
    return;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative overflow-hidden max-w-[360px] rounded-lg border my2 cursor-zoom-in">
          <img
            src={url}
            alt="Message Image"
            className="rounded-md object-cover size-full"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] border-none bg-transparent p-0 shadow-none">
        <img
          src={url}
          alt="Message Image"
          className="rounded-md object-cover size-full"
        />
      </DialogContent>
    </Dialog>
  );
};
