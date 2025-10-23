// src/App.tsx

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ChannelList from "./ChannelList";
import ChatMessages from "./ChatMessages";
import { ChannelProvider, useChannelContext } from "./context/Channel";
import { ServerProvider, useServerContext } from "./context/Server";
import ServerList from "./ServerList";

function App() {
  return (
    <>
      <div className="flex h-screen">
        <ServerProvider>
          {/* Server List - Left Sidebar */}
          <ServerList />
          <ChannelProvider>
            <ServerView />
          </ChannelProvider>
        </ServerProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </>
  );
}

function ServerView() {
  const serverContext = useServerContext();
  const channelContext = useChannelContext();

  return (
    serverContext.selectedServer !== undefined && serverContext.selectedServer !== null ? (
      <>
        <ChannelList />

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-background-light">
          {/* Chat Header */}
          <div className="h-14 bg-background-light border-b border-border px-4 flex items-center">
            <h2 className="text-white font-medium">
              # {channelContext.selectedChannel?.name ?? "No channel selected"}
            </h2>
          </div>

          {/* Chat Messages */}
          {channelContext.selectedChannel !== null && <ChatMessages />}
        </div>
      </>
    ) : (
        <>
            <div className="flex-1 flex flex-col bg-background-light">
            </div>

        </>
    )
  );
}

export default App;
