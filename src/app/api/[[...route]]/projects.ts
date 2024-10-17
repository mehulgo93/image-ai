import { z } from "zod";
import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { projects, projectsInsertSchema } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq, and } from "drizzle-orm";

const app = new Hono()
.get("/:id", verifyAuth(), zValidator("param", z.object({id: z.string()})), async (c) => {
    const auth = c.get("authUser");
    const { id } = c.req.valid("param");
    if (!auth.token?.id) {
        return c.json({error: "Unauthorized"}, 401);
    }
    const data = await db.select().from(projects).where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)));
    if (data?.length === 0) {
        return c.json({error: "Project not found"}, 404);
    }
    return c.json(data[0]);
}
)
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