import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { useStore } from '@/store/useStore';
import { CATEGORIES, CATEGORY_META, type Category } from '@/utils/predictionTemplates';

type Props = {
  value: Category;
  onChange: (category: Category) => void;
};

/** Horizontal pill selector for the 5 rashifal categories. */
export default function CategoryTabs({ value, onChange }: Props) {
  const lang = useStore((s) => s.language);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {CATEGORIES.map((category) => {
        const meta = CATEGORY_META[category];
        const active = category === value;
        return (
          <Pressable
            key={category}
            onPress={() => onChange(category)}
            style={[styles.chip, active && styles.chipActive]}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={meta.label[lang]}
          >
            <Ionicons
              name={meta.icon as keyof typeof Ionicons.glyphMap}
              size={15}
              color={active ? colors.bg : colors.gold}
            />
            <Text style={[styles.label, active && styles.labelActive]}>{meta.label[lang]}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing.lg, gap: spacing.sm, paddingVertical: spacing.xs },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.card,
  },
  chipActive: { backgroundColor: colors.gold, borderColor: colors.goldLight },
  label: { color: colors.textDim, fontSize: fontSize.small, fontWeight: '600' },
  labelActive: { color: colors.bg },
});
