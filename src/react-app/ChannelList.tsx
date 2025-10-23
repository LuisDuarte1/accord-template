import React, { useEffect, useState } from "react";
import { useChannelContext } from "./context/Channel";
import ChannelPopover from "./ChannelPopover";
import { useServerContext } from "./context/Server";
import { getChannels } from "./queries/channels";

export interface ChannelObject {
  id: string;
  name: string;
}

const ChannelList: React.FC = () => {
  const channelContext = useChannelContext();
  const serverContext = useServerContext();
  const [isChannelPopoverOpen, setIsChannelPopoverOpen] = useState(false);

  const channels = getChannels(serverContext.selectedServer!);
  const handleChannelClick = (channel: ChannelObject) => {
    channelContext.setSelectedChannel(channel);
  };



  useEffect(() => {
    if (
      serverContext.selectedServer !== null &&
      channels.data !== undefined &&
      channels.data.length > 0 &&
      channelContext.selectedChannel === null
    ) {
      channelContext.setSelectedChannel(channels.data[0]);
    }
  }, [channels, serverContext, channelContext]);

  return (
    <div className="w-64 bg-background-medium text-white p-4">
      <h1 className="text-xl font-bold mb-4">
        {serverContext.selectedServer!.name}
      </h1>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-text-secondary text-sm uppercase">Channels</h2>
          <button
            className="text-text-secondary hover:text-white transition-colors"
            onClick={() => setIsChannelPopoverOpen(true)}
          >
            +
          </button>
        </div>
        <ul>
          {channels.data !== undefined &&
            channels.data.map((channel) => (
              <li
                key={channel.id}
                className={`py-1 cursor-pointer hover:bg-background-light/50 transition-colors ${
                  channelContext.selectedChannel?.id === channel.id
                    ? "bg-background-light rounded"
                    : ""
                }`}
                onClick={() => handleChannelClick(channel)}
              >
                # {channel.name}
              </li>
            ))}
        </ul>
      </div>
      <ChannelPopover
        isOpen={isChannelPopoverOpen}
        setIsOpen={setIsChannelPopoverOpen}
      />
    </div>
  );
};

export default ChannelList;
