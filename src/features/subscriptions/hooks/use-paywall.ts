import { useSubscriptionModal } from "@/features/subscriptions/store/use-subscription-model";


export const usePaywall = () => {
    const subscriptionModal = useSubscriptionModal();

    const shouldBlock = true;
    return {
        isLoading: false,
        shouldBlock,
        triggerPaywall: () => {
            subscriptionModal.onOpen();
        }
    }
}