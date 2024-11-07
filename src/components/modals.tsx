"use client";

import { SubscriptionModal } from "@/features/subscriptions/components/subscription-modal";
import { SuccessModal } from "@/features/subscriptions/components/success-modal";
import { FailModal } from "@/features/subscriptions/components/fail-modal";
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
      <FailModal />
      <SubscriptionModal />
      <SuccessModal />
    </>
  );
};
