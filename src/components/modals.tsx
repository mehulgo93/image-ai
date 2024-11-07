"use client";

import { SubscriptionModal } from "@/features/subscriptions/components/subscription-modal";
import { useEffect, useState } from "react";

export const Modals = () => {
  // usually when there are hydration errors between the client and the server side you can use the mounted state for dealing with that.
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <SubscriptionModal />
    </>
  );
};
