import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors, fontSize, radius, shadow, spacing } from '@/constants/theme';
import { useStore } from '@/store/useStore';
import { UI } from '@/utils/i18n';

type Props = {
  locked: boolean;
  children: React.ReactNode;
  onUpgrade: () => void;
  title?: string;
  body?: string;
};

/** Blurs locked premium content and shows an upgrade call to action. */
export default function PremiumGate({ locked, children, onUpgrade, title, body }: Props) {
  const lang = useStore((s) => s.language);

  if (!locked) return <>{children}</>;

  return (
    <View style={styles.wrap}>
      <View style={styles.hidden} pointerEvents="none">
        {children}
      </View>
      <BlurView intensity={42} tint="dark" style={StyleSheet.absoluteFill}>
        <Animated.View entering={FadeIn.duration(320)} style={styles.overlay}>
          <View style={[styles.lockCircle, shadow(8)]}>
            <Ionicons name="lock-closed" size={22} color={colors.gold} />
          </View>
          <Text style={styles.title}>{title ?? UI.lockedTitle[lang]}</Text>
          <Text style={styles.body}>{body ?? UI.lockedBody[lang]}</Text>
          <Pressable onPress={onUpgrade} style={[styles.cta, shadow(8)]} accessibilityRole="button">
            <Ionicons name="diamond" size={16} color="#1a1200" />
            <Text style={styles.ctaText}>{UI.upgrade[lang]}</Text>
          </Pressable>
        </Animated.View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { borderRadius: radius.lg, overflow: 'hidden' },
  hidden: { opacity: 0.6 },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.xl,
    backgroundColor: 'rgba(10,10,26,0.55)',
  },
  lockCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(245,158,11,0.16)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: { color: colors.text, fontSize: fontSize.h3, fontWeight: '800', textAlign: 'center' },
  body: { color: colors.textDim, fontSize: fontSize.small, textAlign: 'center', lineHeight: 20 },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.gold,
  },
  ctaText: { color: '#1a1200', fontWeight: '900', fontSize: fontSize.body },
});
