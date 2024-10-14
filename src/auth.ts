import NextAuth from "next-auth"
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/db/drizzle";

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Github, Google],
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  }
})