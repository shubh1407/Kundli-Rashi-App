import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import type { Lang } from '@/utils/i18n';
import { UI } from '@/utils/i18n';
import { getSign } from '@/utils/zodiacData';

export const NOTIFICATION_CHANNEL_ID = 'daily-rashifal';

/** Must be called once, at app start, before any notification is presented. */
export function configureNotificationHandler(): void {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export type ReminderResult = { ok: boolean; reason?: 'unsupported' | 'denied' | 'error' };

export async function applyReminder(
  enabled: boolean,
  hour: number,
  minute: number,
  signId: number,
  lang: Lang,
): Promise<ReminderResult> {
  if (Platform.OS === 'web') return { ok: false, reason: 'unsupported' };

  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    if (!enabled) return { ok: true };

    const current = await Notifications.getPermissionsAsync();
    let granted = current.granted;
    if (!granted) {
      const requested = await Notifications.requestPermissionsAsync();
      granted = requested.granted;
    }
    if (!granted) return { ok: false, reason: 'denied' };

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNEL_ID, {
        name: 'Daily Rashifal',
        importance: Notifications.AndroidImportance.HIGH,
        lightColor: '#f59e0b',
        vibrationPattern: [0, 220, 120, 220],
        sound: 'default',
      });
    }

    const sign = getSign(signId);
    const title = lang === 'hi' ? `✦ ${UI.appName.hi} — ${sign.symbol} ${sign.name.hi}` : `✦ ${UI.appName.en} — ${sign.symbol} ${sign.name.en}`;
    const body =
      lang === 'hi'
        ? `आज ${sign.name.hi} राशि का राशिफल तैयार है। शुभ रंग ${sign.luckyColor.hi}, आइए देखें।`
        : `Your ${sign.name.en} rashifal is ready. Lucky colour today: ${sign.luckyColor.en}. Tap to read.`;

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: 'default',
        data: { screen: 'home' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
        channelId: NOTIFICATION_CHANNEL_ID,
      },
    });

    return { ok: true };
  } catch {
    return { ok: false, reason: 'error' };
  }
}

export async function cancelAllReminders(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch {
    // ignore — nothing scheduled
  }
}

export async function hasScheduledReminder(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  try {
    const all = await Notifications.getAllScheduledNotificationsAsync();
    return all.length > 0;
  } catch {
    return false;
  }
}
