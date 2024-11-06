import {client} from "@/lib/hono";
import { toast } from "sonner";
import { InferRequestType } from "hono";
import { useQuery } from "@tanstack/react-query";

type RequestType = InferRequestType<typeof client.api.projects.templates.$get>["query"];

export const useGetTemplates = (apiQuery: RequestType) => {
    const query = useQuery({
        queryKey: ["templates", {page: apiQuery.page, limit: apiQuery.limit}],
        queryFn: async () => {
            const response = await client.api.projects.templates.$get({
                query: apiQuery,
            });

            if (!response.ok) {
                toast.error("Failed to fetch templates");
                throw new Error("Failed to fetch templates");
            }

            const {data} = await response.json();
            return data;
        }
    })
    return query;
}



