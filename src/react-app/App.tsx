// src/App.tsx

import { useEffect } from "react";
import ChannelList, { ChannelObject } from "./ChannelList";
import ChatMessages, { MessageObject } from "./ChatMessages";
import { ChannelProvider, useChannelContext } from "./context/Channel";
import { useServerContext } from "./context/Server";
import ServerList, { ServerObject } from "./ServerList";

function App() {
  const servers: ServerObject[] = [
    { id: "1", name: "S1" },
    { id: "2", name: "S2" },
    { id: "3", name: "S3" },
  ];

  return (
    <>
      <div className="flex h-screen">
        {/* Server List - Left Sidebar */}
        <ServerList servers={servers} />
        <ChannelProvider>
          <ServerView />
        </ChannelProvider>
      </div>
    </>
  );
}

function ServerView() {
  const serverContext = useServerContext();
  const channelContext = useChannelContext();

  const messages: MessageObject[] = [
    {
      id: "msg1",
      author: {
        id: "user1",
        name: "User 1",
        avatarInitials: "U1",
      },
      content: "Hello everyone! How are you doing today?",
      timestamp: "Today at 12:34 PM",
    },
    {
      id: "msg2",
      author: {
        id: "user2",
        name: "User 2",
        avatarInitials: "U2",
      },
      content: "I'm doing great! Just working on some new features.",
      timestamp: "Today at 12:36 PM",
    },
  ];

  const channelList: ChannelObject[] = [
    { id: "asdasd", name: "general" },
    { id: "asdasd2", name: "random" },
  ];

  useEffect(() => {
    if (
      serverContext.selectedServer !== null &&
      channelContext.selectedChannel === null &&
      channelList.length > 0
    ) {
      channelContext.setSelectedChannel(channelList[0]);
    }
  }, [channelList, serverContext, channelContext]);

  return (
    serverContext.selectedServer !== null && (
      <>
        <ChannelList
          channels={channelList}
          serverName={serverContext.selectedServer.name}
        />

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-background-light">
          {/* Chat Header */}
          <div className="h-14 bg-background-light border-b border-border px-4 flex items-center">
            <h2 className="text-white font-medium">
              # {channelContext.selectedChannel?.name ?? "No channel selected"}
            </h2>
          </div>

          {/* Chat Messages */}
          <ChatMessages messages={messages} />

          {/* Chat Input */}
          {channelContext.selectedChannel !== null && (
            <div className="p-4 bg-background-medium">
              <div className="bg-background-light rounded-lg flex items-center p-2">
                <button className="text-text-secondary hover:text-white px-2">
                  +
                </button>
                <input
                  type="text"
                  className="bg-transparent border-none flex-1 text-white focus:outline-none px-2"
                  placeholder={`Message #${channelContext.selectedChannel.name}`}
                />
                <button className="text-text-secondary hover:text-white px-2">
                  😀
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    )
  );
}

export default App;
