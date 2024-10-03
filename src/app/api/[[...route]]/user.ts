import {z} from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";


const app = new Hono()
    .get("/", (c) => {
    return c.json({user: "GET"})
})
    .get("/:name", zValidator("param", z.object({
    name: z.string(),
})), (c) => {
    const params = c.req.param();

    if (true) {
        return c.json({error: "Something went wrong"}, 400)
    }

    return c.json({username: params.name}, 200);
})

export default app;