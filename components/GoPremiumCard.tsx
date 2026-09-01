import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { GOLD_GRADIENT, colors, fontSize, radius, shadow, spacing } from '@/constants/theme';
import { useStore } from '@/store/useStore';
import { UI } from '@/utils/i18n';

type Props = { onPress: () => void };

/** Gold gradient card with a travelling shimmer, promoting the premium plan. */
export default function GoPremiumCard({ onPress }: Props) {
  const lang = useStore((s) => s.language);
  const shimmer = useSharedValue(-1.4);

  useEffect(() => {
    shimmer.value = withRepeat(withTiming(1.4, { duration: 2400, easing: Easing.linear }), -1, false);
  }, [shimmer]);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmer.value * 240 }],
  }));

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={UI.goPremium[lang]}>
      <View style={[styles.card, shadow(10)]}>
        <Animated.View style={[StyleSheet.absoluteFill, styles.shimmerWrap, shimmerStyle]} pointerEvents="none">
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.35)', 'rgba(255,255,255,0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.shimmerBar}
          />
        </Animated.View>

        <View style={styles.iconWrap}>
          <Ionicons name="diamond" size={20} color="#1a1200" />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.title}>{UI.premiumTitle[lang]}</Text>
          <Text style={styles.body} numberOfLines={2}>
            {UI.premiumBody[lang]}
          </Text>
        </View>
        <View style={styles.cta}>
          <Text style={styles.ctaText}>{UI.upgrade[lang]}</Text>
          <Ionicons name="arrow-forward" size={14} color="#1a1200" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.xl,
    overflow: 'hidden',
    backgroundColor: colors.gold,
  },
  shimmerWrap: { alignItems: 'center', justifyContent: 'center' },
  shimmerBar: { width: 130, height: '220%' },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(26,18,0,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: { flex: 1 },
  title: { color: '#1a1200', fontSize: fontSize.h3, fontWeight: '900' },
  body: { color: 'rgba(26,18,0,0.75)', fontSize: fontSize.tiny, marginTop: 3, lineHeight: 16 },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(26,18,0,0.14)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  ctaText: { color: '#1a1200', fontWeight: '900', fontSize: fontSize.tiny },
});
