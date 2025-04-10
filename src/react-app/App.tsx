// src/App.tsx

import ChannelList, { ChannelObject } from "./ChannelList";
import ServerList, { ServerObject } from "./ServerList";

function App() {
    const servers: ServerObject[] = [
        { id: '1', name: 'S1' },
        { id: '2', name: 'S2', isActive: true},
        { id: '3', name: 'S3' },
    ];

    const channelList: ChannelObject[] = [
        { id: "asdasd", name: "general", isActive: true },
        { id: "asdasd2", name: "random" }
    ];

    return (
        <>
            <div className="flex h-screen">
                {/* Server List - Left Sidebar */}
                <ServerList servers={servers} />

                <ChannelList channels={channelList} serverName="S2"/>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col bg-background-light">
                    {/* Chat Header */}
                    <div className="h-14 bg-background-light border-b border-border px-4 flex items-center">
                        <h2 className="text-white font-medium"># random</h2>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="mb-4">
                            <div className="flex items-start">
                                <div className="w-10 h-10 rounded-full bg-blue-600 mr-3 flex items-center justify-center text-white">
                                    U1
                                </div>
                                <div>
                                    <div className="flex items-baseline">
                                        <span className="font-bold text-white mr-2">
                                            User 1
                                        </span>
                                        <span className="text-xs text-text-secondary">
                                            Today at 12:34 PM
                                        </span>
                                    </div>
                                    <p className="text-text-muted">
                                        Hello everyone! How are you doing today?
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-start">
                                <div className="w-10 h-10 rounded-full bg-green-500 mr-3 flex items-center justify-center text-white">
                                    U2
                                </div>
                                <div>
                                    <div className="flex items-baseline">
                                        <span className="font-bold text-white mr-2">
                                            User 2
                                        </span>
                                        <span className="text-xs text-text-secondary">
                                            Today at 12:36 PM
                                        </span>
                                    </div>
                                    <p className="text-text-muted">
                                        I'm doing great! Just working on some
                                        new features.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 bg-background-medium">
                        <div className="bg-background-light rounded-lg flex items-center p-2">
                            <button className="text-text-secondary hover:text-white px-2">
                                +
                            </button>
                            <input
                                type="text"
                                className="bg-transparent border-none flex-1 text-white focus:outline-none px-2"
                                placeholder="Message #random"
                            />
                            <button className="text-text-secondary hover:text-white px-2">
                                😀
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
