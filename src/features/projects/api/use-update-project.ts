import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.projects[":id"]["$patch"], 200>;
type RequestType = InferRequestType<typeof client.api.projects[":id"]["$patch"]>["json"];

export const useUpdateProject = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.projects[":id"].$patch({
        param: { id },
        json,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: () => {
      // TODO: Invalidate the project query

      queryClient.invalidateQueries({ queryKey: ["project", { id }] });
    },
    onError: () => {
      toast.error("Failed to update project");
    }
  });

  return mutation;
};
