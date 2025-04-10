import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { UserProvider } from "./context/User.tsx";
import UsernamePopover from "./UsernamePopover.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
        <header className="flex justify-between items-center">
          <UsernamePopover />
        </header>
        <App />
    </UserProvider>
  </StrictMode>,
);
