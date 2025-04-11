import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Server } from "../../worker/types";

export function getServers() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["server-list"],
    queryFn: async () => {
      const response = await fetch("/api/servers");
      if (!response.ok) {
        throw new Error(`Response throwed ${response.status}`);
      }
      return (await response.json()) as Server[];
    },
  });
}

type CreateServerResponse = {
  id: string;
  name: string;
};

export function createServer() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryClient = useQueryClient();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation<CreateServerResponse, Error, { name: string }>({
      mutationFn: async (newServer) => {
        const response = await fetch('/api/servers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newServer),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create server');
        }

        return response.json();
      },
      onSuccess: () => {
        // Invalidate servers query to refetch the list
        queryClient.invalidateQueries({ queryKey: ['server-list'] });
      }
    });
}
