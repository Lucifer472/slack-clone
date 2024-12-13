import { format } from "date-fns";

export const ChannelHero = ({
  name,
  createdAt,
}: {
  name: string;
  createdAt: Date;
}) => {
  return (
    <div className="mt-[88px] mx-5 mb-4">
      <p className="text-2xl font-bold flex items-center mb-2"># {name}</p>
      <p className="font-normal text-slate-800 mb-4">
        This Channel was created on {format(createdAt, "MMMM do, yyyy")} this is
        the very beginning of the <strong>{name}</strong> channel
      </p>
    </div>
  );
};
