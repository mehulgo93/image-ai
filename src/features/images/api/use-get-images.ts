import {client} from "@/lib/hono";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

export const useGetImages = () => {
    const query = useQuery({
        queryKey: ["images"],
        queryFn: async () => {
            const response = await client.api.images.$get();

            if (!response.ok) {
                toast.error("Failed to fetch images");
                throw new Error("Failed to fetch images");
            }

            const {data} = await response.json();
            return data;
        }
    })
    return query;
}



