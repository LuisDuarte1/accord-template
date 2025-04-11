import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Server } from "../../worker/types";
import type { Channel } from "../../worker/types";

export function getChannels(server: Server) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["channel-list", server.id],
    queryFn: async () => {
      const response = await fetch(`/api/servers/${server.id}/channels`);
      if (!response.ok) {
        throw new Error(`Response throwed ${response.status}`);
      }
      return (await response.json()) as Channel[];
    },
  });
}

type CreateChannelResponse = {
  id: string;
  name: string;
};

export function createChannels(server: Server) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryClient = useQueryClient();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation<CreateChannelResponse, Error, { name: string }>({
    mutationFn: async (newChannel) => {
      const response = await fetch(`/api/servers/${server.id}/channels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newChannel),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create channel");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate servers query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["channel-list", server.id] });
    },
  });
}
