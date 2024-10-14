
import { z } from "zod";
import bcrypt from "bcrypt";
import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
const app = new Hono()
.post(
    "/",
    zValidator("json", z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(3).max(20),
    })),
    async (c) => {
        const { name, email, password } = c.req.valid("json");
        const hashedPassword = await bcrypt.hash(password, 12)

        const query = await db.select().from(users).where(eq(users.email, email));
        if (query.length > 0) {
            return c.json({
                error: "User already exists",
            }, 400);
        }

        await db.insert(users).values({
            name,
            email,
            password: hashedPassword,
        })

        return c.json(null, 200);
    }
)


export default app;
