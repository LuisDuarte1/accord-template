import { useState, useRef, useEffect, FormEvent, ChangeEvent } from "react";
import { createServer } from "./queries/servers";



const ServerPopover = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Create server mutation
  const createServerMutation = createServer()

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
      setError("Server name cannot be empty");
      return;
    }

    if (inputValue.length < 3) {
      setError("Server name must be at least 3 characters");
      return;
    }

    if (inputValue.length > 30) {
      setError("Server name cannot exceed 30 characters");
      return;
    }

    // Create the server
    createServerMutation.mutate({ name: inputValue }, {
      onSuccess: () => {
        setIsOpen(false);
        setError("");
        setInputValue(""); // Reset input after submission
      },
      onError: (error) => {
        setError(error.message);
      }
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (error) setError("");
  };

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
              Create a New Server
            </h3>
            <p className="text-[--color-text-secondary] text-sm">
              Enter a name for your new server.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Server name"
                className="w-full bg-[--color-background-dark] text-[--color-text-primary] border border-[--color-border] rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[--color-blue-600]"
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-background-light text-white py-1.5 px-3 rounded-md hover:opacity-90 transition-opacity"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-background-light text-white py-1.5 px-3 rounded-md hover:opacity-90 transition-opacity"
                disabled={createServerMutation.isPending}
              >
                {createServerMutation.isPending ? "Creating..." : "Create Server"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ServerPopover;
