import { useEffect, useState } from "react";
import { UserContext } from "./user";

// Provider component
type UserProviderProps = {
    children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load username from localStorage on initial render
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
        setIsLoading(false);
    }, []);

    // Update username in both state and localStorage
    const updateUsername = (newUsername: string) => {
        localStorage.setItem("username", newUsername);
        setUsername(newUsername);
    };

    // Clear the username
    const clearUsername = () => {
        localStorage.removeItem("username");
        setUsername("");
    };

    const value = {
        username,
        updateUsername,
        clearUsername,
        isLoading,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
