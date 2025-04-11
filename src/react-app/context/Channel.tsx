import { ChannelObject } from "../ChannelList";
import { createContext, useContext, useState, ReactNode } from "react";

const ChannelContext = createContext<{
  selectedChannel: ChannelObject | null;
  setSelectedChannel: (server: ChannelObject) => void;
}>({
  selectedChannel: null,
  setSelectedChannel: () => {},
});

export const ChannelProvider = ({ children }: { children: ReactNode }) => {
  const [selectedChannel, setSelectedChannel] = useState<ChannelObject | null>(
    null,
  );

  return (
    <ChannelContext.Provider value={{ selectedChannel, setSelectedChannel }}>
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannelContext = () => useContext(ChannelContext);
