import { ServerObject } from "../ServerList";
import { createContext, useContext, useState, ReactNode } from "react";

const ServerContext = createContext<{
  selectedServer: ServerObject | null;
  setSelectedServer: (server: ServerObject) => void;
}>({
  selectedServer: null,
  setSelectedServer: () => {},
});

export const ServerProvider = ({ children }: { children: ReactNode }) => {
  const [selectedServer, setSelectedServer] = useState<ServerObject | null>(
    null,
  );

  return (
    <ServerContext.Provider value={{ selectedServer, setSelectedServer }}>
      {children}
    </ServerContext.Provider>
  );
};

export const useServerContext = () => useContext(ServerContext);
