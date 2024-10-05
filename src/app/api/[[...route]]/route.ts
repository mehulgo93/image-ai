import ai from "./ai";
import {Hono} from "hono";
import images from "./images";
import {handle} from "hono/vercel";

// Revert to "edge" if planning on running on the edge
export const runtime = "nodejs";

const app = new Hono().basePath("/api");

const routes = app 
.route("/ai", ai)
.route("/images", images)

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;


