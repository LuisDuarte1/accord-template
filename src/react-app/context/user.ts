import { createContext, useContext } from "react";

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

export const UserContext = createContext<UserContextType>(defaultUserContext);

// Custom hook to use the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
