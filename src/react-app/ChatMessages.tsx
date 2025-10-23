import React, { useEffect, useState } from "react";
import { useServerContext } from "./context/Server";
import { useChannelContext } from "./context/Channel";

import { AccordMessage } from "../worker/types";
import useWebSocket from "react-use-websocket";
import { useUser } from "./context/user";
import { useQuery } from "@tanstack/react-query";


const ChatMessages: React.FC = () => {
  const serverContext = useServerContext();
  const channelContext = useChannelContext();
  const usernameProvider = useUser();

  const [messages, setMessages] = useState<AccordMessage[]>([]);
  const [populatedFromAPI, setPoupulatedFromAPI] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
      setMessages([])
      setPoupulatedFromAPI(false)
  }, [serverContext, channelContext])

  const serverId = serverContext.selectedServer?.id;
  const channelId = channelContext.selectedChannel?.id;

  const latestMessagesFromAPI =  useQuery({
    queryKey: ["message-list", serverId, channelId],
    queryFn: async () => {
      const response = await fetch(`/api/servers/${serverContext.selectedServer!.id}/channels/${channelContext.selectedChannel!.id}/messages`);
      if (!response.ok) {
        throw new Error(`Response throwed ${response.status}`);
      }
      return (await response.json()) as AccordMessage[];
    },
  });

  useEffect(() => {
    if (latestMessagesFromAPI.status === "success" && !populatedFromAPI) {
      setMessages(latestMessagesFromAPI.data.reverse());
      setPoupulatedFromAPI(true);
    }
  }, [latestMessagesFromAPI, populatedFromAPI, setMessages]);

  const { sendMessage, lastJsonMessage } = useWebSocket(
    `ws://${location.host}/api/servers/${serverContext.selectedServer!.id}/channels/${channelContext.selectedChannel!.id}/connect`,
    {
        queryParams: {
            username: usernameProvider.username
        },
        reconnectAttempts: 10,
        reconnectInterval: 3000,
    }
  );

  useEffect(() => {
      const maybeMessage = lastJsonMessage as AccordMessage & {type: "ack" | "message"}
      if(lastJsonMessage !== null && maybeMessage.type === "message" && maybeMessage.id !== messages.at(-1)?.id) {
        setMessages([...messages, maybeMessage])
      }
  }, [lastJsonMessage, setMessages, messages])


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      sendMessage(messageInput);
      setMessageInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (messageInput.trim()) {
        sendMessage(messageInput);
        setMessageInput("");
      }
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div className="mb-4" key={message.id}>
            <div className="flex items-start">
              <div
                className={`w-10 h-10 rounded-full bg-blue-600 mr-3 flex items-center justify-center text-white`}
              >
                {message.username.substring(0, 3).toUpperCase()}
              </div>
              <div>
                <div className="flex items-baseline">
                  <span className="font-bold text-white mr-2">
                    {message.username}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {new Date(message.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-text-muted">{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-background-medium">
        <form onSubmit={handleSendMessage} className="bg-background-light rounded-lg flex items-center p-2">
          <button type="button" className="text-text-secondary hover:text-white px-2">
            +
          </button>
          <input
            type="text"
            className="bg-transparent border-none flex-1 text-white focus:outline-none px-2"
            placeholder={`Message #${channelContext.selectedChannel!.name}`}
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="submit" className="text-text-secondary hover:text-white px-2">
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatMessages;
