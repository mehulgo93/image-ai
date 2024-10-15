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
      <ul className="flex flex-col gap-y-1 px-3"></ul>
    </div>
  );
};
