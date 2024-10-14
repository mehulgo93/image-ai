"use client";

import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const SidebarRoutes = () => {
  return (
    <div className="flex flex-col gap-y-4 flex-1">
      <div className="px-4">
        <Button
          onClick={() => {}}
          className="w-full rounded-xl border-none hover:bg-white hover:opacity-75 transition"
          variant="outline"
          size="lg"
        >
          <Crown className="mr-2 h-4 w-4 fill-yellow-500 text-yellow-500" />
          Upgrade to Image AI Pro
        </Button>
      </div>
      <div className="px-3">
        <Separator />
      </div>
      <ul className="flex flex-col gap-y-1 px-3"></ul>
    </div>
  );
};
