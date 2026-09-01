import { useCallback, useMemo } from 'react';
import { useStore, FREE_FAVORITE_LIMIT } from '@/store/useStore';

export type PremiumFeature = 'weekly' | 'monthly' | 'yearly' | 'kundli' | 'unlimitedFavorites';

/**
 * Single source of truth for premium state.
 * `setPremium` toggles the mock entitlement (no billing SDK is bundled).
 */
export function usePremium() {
  const isPremium = useStore((s) => s.isPremium);
  const hasPurchased = useStore((s) => s.hasPurchased);
  const setPremium = useStore((s) => s.setPremium);
  const setHasPurchased = useStore((s) => s.setHasPurchased);

  const isLocked = useCallback(
    (feature: PremiumFeature) => {
      if (isPremium) return false;
      return feature !== 'unlimitedFavorites';
    },
    [isPremium],
  );

  const activate = useCallback(
    (lifetime = false) => {
      setPremium(true);
      if (lifetime) setHasPurchased(true);
    },
    [setPremium, setHasPurchased],
  );

  /** Mock restore — re-activates premium only when a previous mock purchase exists. */
  const restore = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    const purchased = useStore.getState().hasPurchased;
    if (purchased) useStore.getState().setPremium(true);
    return purchased;
  }, []);

  const maxFavorites = useMemo(() => (isPremium ? Number.MAX_SAFE_INTEGER : FREE_FAVORITE_LIMIT), [isPremium]);

  return { isPremium, hasPurchased, isLocked, activate, restore, setPremium, maxFavorites };
}
