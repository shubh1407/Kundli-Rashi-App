import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { useStore } from '@/store/useStore';
import { PERIODS, type Period } from '@/utils/predictionTemplates';

type Props = {
  value: Period;
  onChange: (period: Period) => void;
  isLocked: (period: Period) => boolean;
};

/** Segmented daily / weekly / monthly selector — locked rows show a padlock. */
export default function PeriodTabs({ value, onChange, isLocked }: Props) {
  const lang = useStore((s) => s.language);

  return (
    <View style={styles.wrap}>
      {PERIODS.map((period) => {
        const active = period === value;
        const locked = isLocked(period);
        const label = period === 'daily' ? { en: 'Daily', hi: 'दैनिक' } : period === 'weekly' ? { en: 'Weekly', hi: 'साप्ताहिक' } : { en: 'Monthly', hi: 'मासिक' };
        return (
          <Pressable
            key={period}
            onPress={() => onChange(period)}
            style={[styles.tab, active && styles.tabActive]}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={label[lang]}
          >
            <Text style={[styles.label, active && styles.labelActive]}>{label[lang]}</Text>
            {locked ? (
              <Ionicons name="lock-closed" size={12} color={active ? colors.bg : colors.gold} />
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  tabActive: { backgroundColor: colors.gold },
  label: { color: colors.textDim, fontSize: fontSize.small, fontWeight: '700' },
  labelActive: { color: colors.bg },
});
