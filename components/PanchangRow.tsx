import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, spacing } from '@/constants/theme';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  sub?: string;
};

/** Single row inside the panchang card: icon · label · value. */
export default function PanchangRow({ icon, label, value, sub }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={14} color={colors.gold} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueWrap}>
        <Text style={styles.value} numberOfLines={1}>
          {value}
        </Text>
        {sub ? <Text style={styles.sub}>{sub}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderSoft,
  },
  iconWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(245,158,11,0.1)',
  },
  label: { color: colors.textDim, fontSize: fontSize.small, fontWeight: '600', width: 96 },
  valueWrap: { flex: 1, alignItems: 'flex-end' },
  value: { color: colors.text, fontSize: fontSize.small, fontWeight: '700', textAlign: 'right' },
  sub: { color: colors.textFaint, fontSize: fontSize.tiny, marginTop: 1 },
});
