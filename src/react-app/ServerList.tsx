export type ServerObject = {
  id: string;
  name: string;
  isActive?: boolean;
}

type ServerProps = {
  name: string;
  isActive?: boolean;
};

const Server = ({ name, isActive = false }: ServerProps) => {
  const bgColor = isActive ? "bg-blue-600" : "bg-background-light";

  return (
    <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center text-white mb-4`}>
      <span>{name}</span>
    </div>
  );
};

type ServerListProps = {
  servers: ServerObject[]
};

const ServerList = ({ servers }: ServerListProps) => {
  return (
    <div className="w-20 bg-background-dark flex flex-col items-center py-4 overflow-y-auto">
      {servers.map((server) => (
        <Server
          key={server.id}
          name={server.name}
          isActive={server.isActive}
        />
      ))}
      <Server name="+" />
    </div>
  );
};

export default ServerList;
