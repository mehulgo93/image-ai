import {Hono} from "hono";
import {handle} from "hono/vercel";
import user from "./user";

// Revert to "edge" if planning on running on the edge
export const runtime = "nodejs";

const app = new Hono().basePath("/api");

const routes = app.route("/user", user)

app.get("/test", (c) => {
    return c.json({test: "hono test"});
})

app.get("/user/:name", (c) => {
    const name = c.req.param("name")
    return c.json({username: name})
})

export const GET = handle(app);


