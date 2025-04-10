import React, {
    useState,
    useRef,
    useEffect,
    FormEvent,
    ChangeEvent,
} from "react";
import { useUser } from "./context/User";

const UsernamePopover = () => {
    const { username, updateUsername, isLoading } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");
    const popoverRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Open popover if no username exists
    useEffect(() => {
        if (!isLoading && !username) {
            setIsOpen(true);
        }
    }, [username, isLoading, popoverRef]);

    // Set initial input value when editing
    useEffect(() => {
        if (isOpen && username) {
            setInputValue(username);
        }
    }, [isOpen, username]);

    // Focus the input when popover opens
    useEffect(() => {
        if (isOpen && inputRef.current && popoverRef.current) {
            popoverRef.current?.togglePopover();
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!inputValue.trim()) {
            setError("Username cannot be empty");
            return;
        }

        if (inputValue.length < 3) {
            setError("Username must be at least 3 characters");
            return;
        }

        if (inputValue.length > 20) {
            setError("Username cannot exceed 20 characters");
            return;
        }

        // Use the context to update username
        updateUsername(inputValue);
        setIsOpen(false);
        setError("");
        setInputValue(""); // Reset input after submission
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (error) setError("");
    };

    if (isLoading) {
        return (
            <div className="h-10 w-32 bg-[--color-background-light] animate-pulse rounded-md"></div>
        );
    }

    return (
        <>
            {isOpen && (
                <div
                    ref={popoverRef}
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-100 bg-zinc-200 border border-bors rounded-md shadow-lg p-4 z-50"
                    popover="manual"
                >
                    <div className="mb-4">
                        <h3 className="text-[--color-text-primary] text-lg font-semibold mb-2">
                            {username
                                ? "Change Username"
                                : "Welcome! Choose a username"}
                        </h3>
                        <p className="text-[--color-text-secondary] text-sm">
                            {username
                                ? "You can update your username below."
                                : "Please select a username to continue."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={handleChange}
                                placeholder="Enter username"
                                className="w-full bg-[--color-background-dark] text-[--color-text-primary] border border-[--color-border] rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[--color-blue-600]"
                            />
                            {error && (
                                <p className="text-red-500 text-xs mt-1">
                                    {error}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end gap-2">
                            {username && (
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-background-light text-white py-1.5 px-3 rounded-md hover:opacity-90 transition-opacity"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                type="submit"
                                className="bg-background-light text-white  py-1.5 px-3 rounded-md hover:opacity-90 transition-opacity"
                            >
                                {username ? "Update" : "Set Username"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default UsernamePopover;
