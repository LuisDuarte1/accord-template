import React from "react";
import { useChannelContext } from "./context/Channel";

export interface ChannelObject {
  id: string;
  name: string;
}

interface ChannelListProps {
  channels: ChannelObject[];
  serverName: string;
}

const ChannelList: React.FC<ChannelListProps> = ({ channels, serverName }) => {
  const channelContext = useChannelContext();

  const handleChannelClick = (channel: ChannelObject) => {
    channelContext.setSelectedChannel(channel);
  };

  return (
    <div className="w-64 bg-background-medium text-white p-4">
      <h1 className="text-xl font-bold mb-4">{serverName}</h1>
      <div className="mb-6">
        <h2 className="text-text-secondary text-sm uppercase mb-2">Channels</h2>
        <ul>
          {channels.map((channel) => (
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
    </div>
  );
};

export default ChannelList;
