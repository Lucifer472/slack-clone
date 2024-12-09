const ChannelPage = async ({
  params,
}: {
  params: Promise<{ id: string; channel: string }>;
}) => {
  const { channel, id } = await params;

  console.log(id + "AND" + channel);

  return <div>Channel Page</div>;
};

export default ChannelPage;
