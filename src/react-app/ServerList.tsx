import { useServerContext } from "./context/Server";

export type ServerObject = {
  id: string;
  name: string;
};

type ServerProps = {
  id: string;
  name: string;
  isActive?: boolean;
};
import { useCallback, useEffect } from "react";

interface ServerClickProps {
  onClick: (server: ServerObject) => void;
}

type ServerWithClickProps = ServerProps & ServerClickProps;

const Server = ({
  name,
  isActive = false,
  id,
  onClick,
}: ServerWithClickProps) => {
  const bgColor = isActive ? "bg-blue-600" : "bg-background-light";

  const handleClick = useCallback(() => {
    onClick({ name, id });
  }, [id, name, onClick]);

  return (
    <div
      className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center text-white mb-4 cursor-pointer hover:opacity-90`}
      onClick={handleClick}
    >
      <span>{name}</span>
    </div>
  );
};

type ServerListProps = {
  servers: ServerObject[];
};

const ServerList = ({ servers }: ServerListProps) => {
  const serverContext = useServerContext();

  useEffect(() => {
    if (serverContext.selectedServer === null) {
      serverContext.setSelectedServer(servers[0]);
    }
  }, [serverContext, servers]);

  return (
    <div className="w-20 bg-background-dark flex flex-col items-center py-4 overflow-y-auto">
      {servers.map((server) => (
        <Server
          key={server.id}
          id={server.id}
          name={server.name}
          isActive={server.id === serverContext.selectedServer?.id}
          onClick={(newServer) => serverContext.setSelectedServer(newServer)}
        />
      ))}
      <div
        className={`w-12 h-12 rounded-full bg-background-light flex items-center justify-center text-white mb-4 cursor-pointer hover:opacity-90`}
        onClick={() => {}}
      >
        <span>+</span>
      </div>
    </div>
  );
};

export default ServerList;
