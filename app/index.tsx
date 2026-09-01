import { Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import ScreenBackground from '@/components/ScreenBackground';
import { colors } from '@/constants/theme';
import { useStore } from '@/store/useStore';

export default function Index() {
  const hydrated = useStore((s) => s.hydrated);
  const onboarded = useStore((s) => s.onboarded);

  if (!hydrated) {
    return (
      <ScreenBackground seed="splash">
        <View style={styles.center}>
          <ActivityIndicator color={colors.gold} size="large" />
        </View>
      </ScreenBackground>
    );
  }

  return <Redirect href={onboarded ? '/home' : '/onboarding'} />;
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
