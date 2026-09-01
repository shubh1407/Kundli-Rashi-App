import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors } from '@/constants/theme';
import { useStore } from '@/store/useStore';
import { configureNotificationHandler } from '@/utils/notifications';

try {
  configureNotificationHandler();
} catch {
  // notifications are optional — never block the UI for them
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ ...Ionicons.font });
  const setHydrated = useStore((s) => s.setHydrated);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!useStore.getState().hydrated) useStore.getState().setHydrated(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [setHydrated]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg },
          animation: 'fade',
        }}
      />
    </GestureHandlerRootView>
  );
}
