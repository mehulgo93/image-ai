import ai from "./ai";
import test from "./test";
import {Context, Hono} from "hono";
import users from "./users";
import images from "./images";
import {handle} from "hono/vercel";
import authConfig from "@/auth.config";
import { AuthConfig } from "@hono/auth-js";

// Revert to "edge" if planning on running on the edge
export const runtime = "nodejs";

function getAuthConfig(c: Context): AuthConfig {
    return {
        secret: c.env.AUTH_SECRET,
        ...authConfig
    }
}

const app = new Hono().basePath("/api");

const routes = app 
.route("/ai", ai)
.route("/images", images)
.route("/users", users)
.route("/test", test)

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;


