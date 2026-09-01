import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Bi, Lang } from '@/utils/i18n';
import type { Category, Period } from '@/utils/predictionTemplates';

export const FREE_FAVORITE_LIMIT = 50;

export type Profile = {
  name: string;
  dob: string; // yyyy-MM-dd
  signId: number;
  moonSignId: number;
};

export type FavoriteItem = {
  id: string;
  signId: number;
  category: Category;
  period: Period;
  dateKey: string;
  stars: number;
  score: number;
  title: Bi;
  savedAt: number;
};

type AppState = {
  hydrated: boolean;
  onboarded: boolean;
  profile: Profile | null;
  language: Lang;
  isPremium: boolean;
  hasPurchased: boolean;
  reminder: { enabled: boolean; hour: number; minute: number };
  streak: { count: number; lastDate: string | null; best: number };
  favorites: FavoriteItem[];

  setHydrated: (value: boolean) => void;
  completeOnboarding: (profile: Profile) => void;
  updateProfile: (patch: Partial<Profile>) => void;
  resetAll: () => void;
  setLanguage: (lang: Lang) => void;
  setPremium: (value: boolean) => void;
  setHasPurchased: (value: boolean) => void;
  setReminder: (reminder: { enabled: boolean; hour: number; minute: number }) => void;
  touchStreak: (todayKey: string) => number;
  toggleFavorite: (item: FavoriteItem, isPremium: boolean) => { ok: boolean; added: boolean; message?: string };
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
};

const initialState = {
  hydrated: false,
  onboarded: false,
  profile: null,
  language: 'hi' as Lang,
  isPremium: false,
  hasPurchased: false,
  reminder: { enabled: true, hour: 8, minute: 0 },
  streak: { count: 0, lastDate: null, best: 0 },
  favorites: [] as FavoriteItem[],
};

const yesterdayKey = (): string => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setHydrated: (value) => set({ hydrated: value }),

      completeOnboarding: (profile) => set({ onboarded: true, profile }),

      updateProfile: (patch) => {
        const current = get().profile;
        if (!current) return;
        set({ profile: { ...current, ...patch } });
      },

      resetAll: () =>
        set({
          ...initialState,
          hydrated: true,
        }),

      setLanguage: (language) => set({ language }),

      setPremium: (isPremium) => set({ isPremium }),

      setHasPurchased: (hasPurchased) => set({ hasPurchased, isPremium: hasPurchased ? true : get().isPremium }),

      setReminder: (reminder) => set({ reminder }),

      touchStreak: (todayKey) => {
        const { streak } = get();
        if (streak.lastDate === todayKey) return streak.count;
        const continues = streak.lastDate === yesterdayKey();
        const count = continues ? streak.count + 1 : 1;
        const best = Math.max(streak.best, count);
        set({ streak: { count, lastDate: todayKey, best } });
        return count;
      },

      toggleFavorite: (item, isPremium) => {
        const { favorites } = get();
        const exists = favorites.find((f) => f.id === item.id);
        if (exists) {
          set({ favorites: favorites.filter((f) => f.id !== item.id) });
          return { ok: true, added: false };
        }
        if (!isPremium && favorites.length >= FREE_FAVORITE_LIMIT) {
          return { ok: false, added: false };
        }
        set({ favorites: [item, ...favorites].slice(0, isPremium ? 500 : FREE_FAVORITE_LIMIT) });
        return { ok: true, added: true };
      },

      removeFavorite: (id) => set({ favorites: get().favorites.filter((f) => f.id !== id) }),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'daily-rashifal-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        onboarded: state.onboarded,
        profile: state.profile,
        language: state.language,
        isPremium: state.isPremium,
        hasPurchased: state.hasPurchased,
        reminder: state.reminder,
        streak: state.streak,
        favorites: state.favorites,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
