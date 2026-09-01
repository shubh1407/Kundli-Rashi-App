import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors, fontSize, glass, radius, shadow, spacing } from '@/constants/theme';
import { useStore } from '@/store/useStore';
import { UI } from '@/utils/i18n';
import type { Prediction } from '@/utils/contentEngine';

type Props = { prediction: Prediction; delay?: number };

/** 2×2 grid with lucky colour, number, time and direction. */
export default function LuckyElementsCard({ prediction, delay = 80 }: Props) {
  const lang = useStore((s) => s.language);

  const items = [
    {
      key: 'color',
      icon: 'color-palette-outline' as const,
      label: UI.luckyColor[lang],
      value: prediction.luckyColor[lang],
      swatch: prediction.luckyColorHex,
    },
    { key: 'number', icon: 'keypad-outline' as const, label: UI.luckyNumber[lang], value: String(prediction.luckyNumber) },
    { key: 'time', icon: 'time-outline' as const, label: UI.luckyTime[lang], value: prediction.luckyTime[lang] },
    { key: 'direction', icon: 'compass-outline' as const, label: UI.luckyDirection[lang], value: prediction.luckyDirection[lang] },
  ];

  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(420)} style={[glass, styles.card, shadow(6)]}>
      <Text style={styles.heading}>{lang === 'hi' ? 'आज के शुभ संकेत' : 'Lucky signals today'}</Text>
      <View style={styles.grid}>
        {items.map((item) => (
          <View key={item.key} style={styles.cell}>
            <View style={styles.iconWrap}>
              {item.swatch ? <View style={[styles.swatch, { backgroundColor: item.swatch }]} /> : <Ionicons name={item.icon} size={15} color={colors.gold} />}
            </View>
            <View style={styles.cellText}>
              <Text style={styles.cellLabel}>{item.label}</Text>
              <Text style={styles.cellValue} numberOfLines={1}>
                {item.value}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { padding: spacing.lg, gap: spacing.md },
  heading: { color: colors.text, fontSize: fontSize.h3, fontWeight: '800' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: spacing.md },
  cell: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.045)',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    padding: spacing.md,
  },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(245,158,11,0.12)',
  },
  swatch: { width: 16, height: 16, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)' },
  cellText: { flex: 1 },
  cellLabel: { color: colors.textFaint, fontSize: fontSize.tiny, fontWeight: '600' },
  cellValue: { color: colors.text, fontSize: fontSize.small, fontWeight: '700', marginTop: 2 },
});
