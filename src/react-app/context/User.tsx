import { createContext, useContext, useEffect, useState } from "react";

// Create the context
type UserContextType = {
    username: string;
    updateUsername: (newUsername: string) => void;
    clearUsername: () => void;
    isLoading: boolean;
};
// Default value for UserContext
const defaultUserContext: UserContextType = {
    username: "",
    updateUsername: () => {},
    clearUsername: () => {},
    isLoading: true,
};

const UserContext = createContext<UserContextType>(defaultUserContext);

// Custom hook to use the context
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

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
