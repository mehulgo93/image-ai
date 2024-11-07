"use client";

import { CreditCard, Crown, Home, MessageCircleQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";
import { useBilling } from "@/features/subscriptions/api/use-billing";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { useCheckout } from "@/features/subscriptions/api/use-checkout";

export const SidebarRoutes = () => {
  const mutation = useCheckout();
  const billingMutation = useBilling();
  const pathname = usePathname();
  const { shouldBlock, isLoading, triggerPaywall } = usePaywall();

  const onClick = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }
    billingMutation.mutate();
  };
  return (
    <div className="flex flex-col gap-y-4 flex-1">
      {shouldBlock && !isLoading && (
        <>
          <div className="px-3">
            <Button
              disabled={mutation.isPending}
              onClick={() => mutation.mutate()}
              className="w-full flex items-center justify-center gap-2 rounded-xl border-none bg-gradient-to-r from-[#2e62cb] via-[#0073ff] to-[#3faff5] text-white hover:from-[#2e62cb] hover:to-[#3faff5] shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
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
        </>
      )}

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
          onClick={onClick}
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
