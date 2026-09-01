import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, spacing } from '@/constants/theme';

type Props = {
  rating: number;
  size?: number;
  showValue?: boolean;
  valueLabel?: string;
};

/** 1–5 star rating rendered with gold Ionicons stars. */
export default function StarRating({ rating, size = 16, showValue = false, valueLabel }: Props) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <View style={styles.row} accessibilityLabel={`${full} of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Ionicons
          key={`star-${i}`}
          name={i < full ? 'star' : 'star-outline'}
          size={size}
          color={i < full ? colors.gold : colors.textFaint}
          style={styles.star}
        />
      ))}
      {showValue ? <Text style={[styles.value, { fontSize: size * 0.8 }]}>{valueLabel ?? `${full}/5`}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  star: { marginRight: 2 },
  value: { color: colors.textDim, marginLeft: spacing.xs, fontWeight: '600' },
});
