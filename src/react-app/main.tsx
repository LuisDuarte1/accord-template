import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { UserProvider } from "./context/User.tsx";
import UsernamePopover from "./UsernamePopover.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <header className="flex justify-between items-center">
                    <UsernamePopover />
                </header>
                <App />
            </UserProvider>
        </QueryClientProvider>
    </StrictMode>,
);
