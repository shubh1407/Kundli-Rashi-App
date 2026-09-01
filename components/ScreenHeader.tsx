import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, spacing } from '@/constants/theme';

type Props = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  right?: React.ReactNode;
};

/** Shared glass-less header with back button for stack screens. */
export default function ScreenHeader({ title, subtitle, showBack = true, right }: Props) {
  const router = useRouter();
  return (
    <View style={styles.row}>
      {showBack ? (
        <Pressable
          onPress={() => router.back()}
          style={styles.btn}
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          <Ionicons name="chevron-back" size={20} color={colors.text} />
        </Pressable>
      ) : (
        <View style={styles.btn} />
      )}
      <View style={styles.titleWrap}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View style={styles.right}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  titleWrap: { flex: 1, alignItems: 'center' },
  title: { color: colors.text, fontSize: fontSize.h3, fontWeight: '800' },
  subtitle: { color: colors.textDim, fontSize: fontSize.tiny, marginTop: 2 },
  right: { minWidth: 40, alignItems: 'flex-end' },
});
