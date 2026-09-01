import { Platform, ViewStyle } from 'react-native';

/** Dark zodiac theme tokens for Daily Rashifal. */
export const colors = {
  bg: '#0a0a1a',
  bgMid: '#1a1a3e',
  bgDeep: '#0f0f2e',
  gold: '#f59e0b',
  goldLight: '#fbbf24',
  goldDeep: '#d97706',
  goldGlow: 'rgba(245,158,11,0.35)',
  violet: '#8b5cf6',
  violetDeep: '#4c1d95',
  card: 'rgba(255,255,255,0.055)',
  cardStrong: 'rgba(26,26,62,0.92)',
  cardSolid: '#15152e',
  border: 'rgba(245,158,11,0.24)',
  borderSoft: 'rgba(255,255,255,0.09)',
  text: '#f4f2ff',
  textDim: '#a3a0cc',
  textFaint: '#6f6c95',
  green: '#34d399',
  red: '#f87171',
  blue: '#60a5fa',
  pink: '#f472b6',
  black: '#000000',
  white: '#ffffff',
};

/** The signature purple gradient: #0a0a1a -> #1a1a3e -> #0f0f2e */
export const GRADIENT = ['#0a0a1a', '#1a1a3e', '#0f0f2e'] as const;
export const GOLD_GRADIENT = ['#fbbf24', '#f59e0b', '#d97706'] as const;
export const VIOLET_GRADIENT = ['#4c1d95', '#6d28d9', '#1a1a3e'] as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;

export const radius = { sm: 10, md: 16, lg: 20, xl: 26, pill: 999 } as const;

export const fontSize = { display: 30, h1: 24, h2: 20, h3: 17, body: 15, small: 13, tiny: 11 } as const;

export const shadow = (elevation = 8): ViewStyle =>
  (Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOpacity: 0.45,
      shadowRadius: elevation,
      shadowOffset: { width: 0, height: Math.round(elevation / 2) },
    },
    android: { elevation },
    default: {},
  }) as ViewStyle);

/** Glassmorphism card base. */
export const glass = {
  backgroundColor: colors.card,
  borderRadius: radius.lg,
  borderWidth: 1,
  borderColor: colors.borderSoft,
} as const;

export const glassGold = {
  backgroundColor: 'rgba(245,158,11,0.08)',
  borderRadius: radius.lg,
  borderWidth: 1,
  borderColor: colors.border,
} as const;
