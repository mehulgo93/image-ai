import { useSubscriptionModal } from "@/features/subscriptions/store/use-subscription-model";
import { useGetSubscription } from "@/features/subscriptions/api/use-get-subscription";

export const usePaywall = () => {
    const {data: subscription, isLoading: isLoadingSubscription} = useGetSubscription();
    const subscriptionModal = useSubscriptionModal();
    
    const shouldBlock = isLoadingSubscription || !subscription?.active;
    return {
        isLoading: false,
        shouldBlock,
        triggerPaywall: () => {
            subscriptionModal.onOpen();
        }
    }
}