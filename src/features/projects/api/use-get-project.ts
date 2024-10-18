import { InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export type ResponseType = InferResponseType<typeof client.api.projects[":id"]["$get"], 200>;

export const useGetProject = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["project", { id }],
    queryFn: async () => {
      const response = await client.api.projects[":id"].$get({
        param: {
          id,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
