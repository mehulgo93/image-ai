import NextAuth from "next-auth"
import Github from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/db/drizzle";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Github],
  adapter: DrizzleAdapter(db),
})