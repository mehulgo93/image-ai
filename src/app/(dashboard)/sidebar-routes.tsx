"use client";

import { CreditCard, Crown, Home, MessageCircleQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

export const SidebarRoutes = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-y-4 flex-1">
      <div className="px-4">
        <Button
          onClick={() => {}}
          className="w-full flex items-center justify-center gap-2 rounded-xl border-none bg-gradient-to-r from-sky-400 to-blue-300 text-white hover:from-sky-300 hover:to-blue-200 shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
          variant="outline"
          size="lg"
        >
          <Crown className="mr-2 size-4 fill-yellow-500 text-yellow-500" />
          Subscribe to Pro
        </Button>
      </div>
      <div className="px-3">
        <Separator />
      </div>
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href="/"
          icon={Home}
          label="Home"
          isActive={pathname === "/"}
        />
      </ul>
      <div className="px-3">
        <Separator />
      </div>
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href={pathname}
          icon={CreditCard}
          label="Billing"
          onClick={() => {}}
        />
      </ul>
      <div className="px-3">
        <Separator />
      </div>
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href="mailto:support@imageai.com"
          icon={MessageCircleQuestion}
          label="Support"
        />
      </ul>
    </div>
  );
};
