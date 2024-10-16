import { z } from "zod";
import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { projects, projectsInsertSchema } from "@/db/schema";
import { db } from "@/db/drizzle";

const app = new Hono()
.post("/", verifyAuth(), zValidator("json", 
    projectsInsertSchema.pick({
        name: true,
        height: true,
        width: true,
        json: true,
    }),

 ),
 async (c) => {
    const auth = c.get("authUser");
    const { name, height, width, json } = c.req.valid("json");
    if (!auth.token?.id) {
        return c.json({error: "Unauthorized"}, 401);
    }
    const data = await db.insert(projects).values({
        name,
        height,
        width,
        json,
        userId: auth.token.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    }).returning();
    if (!data[0]) {
        return c.json({error: "Something went wrong"}, 400);
    }
    return c.json(data[0]);
    
 }
);

export default app;