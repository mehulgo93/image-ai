import "./globals.css";
import { auth } from "@/auth";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Providers } from "@/components/providers";
import { Modals } from "@/components/modals";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your very own AI",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            {children}
            <Toaster />
            <Modals />
          </Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
