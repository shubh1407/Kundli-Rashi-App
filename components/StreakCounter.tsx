import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors, fontSize, glass, radius, shadow, spacing } from '@/constants/theme';
import { UI } from '@/utils/i18n';
import { useStore } from '@/store/useStore';

type Props = { count: number; best: number };

/** Flame + 7 day dots showing the current opening streak. */
export default function StreakCounter({ count, best }: Props) {
  const lang = useStore((s) => s.language);
  const dots = Array.from({ length: 7 }, (_, i) => i < Math.min(7, count));

  return (
    <Animated.View entering={FadeIn.duration(400)} style={[glass, styles.card, shadow(6)]}>
      <View style={styles.flameWrap}>
        <Ionicons name="flame" size={20} color={colors.gold} />
      </View>
      <View style={styles.info}>
        <Text style={styles.count}>
          {count} <Text style={styles.countLabel}>{UI.streak[lang]}</Text>
        </Text>
        <View style={styles.dots}>
          {dots.map((on, i) => (
            <View key={`dot-${i}`} style={[styles.dot, on && styles.dotOn]} />
          ))}
        </View>
      </View>
      <View style={styles.bestWrap}>
        <Ionicons name="trophy-outline" size={13} color={colors.gold} />
        <Text style={styles.best}>{best}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  flameWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(245,158,11,0.14)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  info: { flex: 1 },
  count: { color: colors.text, fontSize: fontSize.h3, fontWeight: '800' },
  countLabel: { color: colors.textDim, fontSize: fontSize.small, fontWeight: '600' },
  dots: { flexDirection: 'row', gap: 5, marginTop: 6 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.14)' },
  dotOn: { backgroundColor: colors.gold },
  bestWrap: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  best: { color: colors.gold, fontWeight: '800', fontSize: fontSize.small },
});
