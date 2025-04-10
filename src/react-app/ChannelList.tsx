import React from "react";

export interface ChannelObject {
  id: string;
  name: string;
  isActive?: boolean;
}

interface ChannelListProps {
  channels: ChannelObject[];
  serverName: string;
}

const ChannelList: React.FC<ChannelListProps> = ({ channels, serverName }) => {
  return (
    <div className="w-64 bg-background-medium text-white p-4">
      <h1 className="text-xl font-bold mb-4">{serverName}</h1>
      <div className="mb-6">
        <h2 className="text-text-secondary text-sm uppercase mb-2">
          Channels
        </h2>
        <ul>
          {channels.map((channel) => (
            <li
              key={channel.id}
              className={`py-1 ${channel.isActive ? 'bg-background-light rounded' : ''}`}
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
