import React from "react";

export interface MessageObject {
  id: string;
  author: {
    id: string;
    name: string;
    avatarInitials: string;
  };
  content: string;
  timestamp: string;
}

interface ChatMessagesProps {
  messages: MessageObject[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => (
        <div className="mb-4" key={message.id}>
          <div className="flex items-start">
            <div
              className={`w-10 h-10 rounded-full bg-blue-600 mr-3 flex items-center justify-center text-white`}
            >
              {message.author.avatarInitials}
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="font-bold text-white mr-2">
                  {message.author.name}
                </span>
                <span className="text-xs text-text-secondary">
                  {message.timestamp}
                </span>
              </div>
              <p className="text-text-muted">{message.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
