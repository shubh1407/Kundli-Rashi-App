import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StarField from '@/components/StarField';
import { GRADIENT, colors, spacing } from '@/constants/theme';

type Props = { children: React.ReactNode; seed?: string };

/** Purple gradient + starfield shell used by every screen. */
export default function ScreenBackground({ children, seed }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.root}>
      <LinearGradient colors={GRADIENT} start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }} style={StyleSheet.absoluteFill} />
      <StarField seed={seed} />
      <View style={[styles.content, { paddingTop: insets.top + spacing.sm }]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { flex: 1 },
});
