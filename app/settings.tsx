import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenBackground from '@/components/ScreenBackground';
import ScreenHeader from '@/components/ScreenHeader';
import { colors, fontSize, glass, radius, shadow, spacing } from '@/constants/theme';
import { usePremium } from '@/hooks/usePremium';
import { useStore } from '@/store/useStore';
import { UI, formatShortDate } from '@/utils/i18n';
import { applyReminder } from '@/utils/notifications';
import { getSign } from '@/utils/zodiacData';

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = [0, 15, 30, 45];

export default function Settings() {
  const router = useRouter();
  const lang = useStore((s) => s.language);
  const setLanguage = useStore((s) => s.setLanguage);
  const profile = useStore((s) => s.profile);
  const reminder = useStore((s) => s.reminder);
  const setReminder = useStore((s) => s.setReminder);
  const clearFavorites = useStore((s) => s.clearFavorites);
  const resetAll = useStore((s) => s.resetAll);
  const favorites = useStore((s) => s.favorites);
  const isPremiumStore = useStore((s) => s.isPremium);
  const { isPremium, activate, restore, setPremium } = usePremium();
  const [busy, setBusy] = useState(false);

  const sign = getSign(profile?.signId ?? 0);
  const moon = getSign(profile?.moonSignId ?? 0);
  const dob = profile?.dob ? new Date(`${profile.dob}T00:00:00`) : new Date();

  const updateReminder = useCallback(
    async (enabled: boolean, hour: number, minute: number) => {
      setReminder({ enabled, hour, minute });
      const result = await applyReminder(enabled, hour, minute, profile?.signId ?? 0, lang);
      if (enabled && !result.ok) {
        Alert.alert(UI.notifications[lang], result.reason === 'unsupported' ? (lang === 'hi' ? 'वेब पर सूचनाएँ उपलब्ध नहीं हैं।' : 'Notifications are unavailable on web.') : UI.notifBlocked[lang]);
      }
    },
    [lang, profile, setReminder],
  );

  const onRestore = useCallback(async () => {
    setBusy(true);
    const ok = await restore();
    setBusy(false);
    Alert.alert(UI.restore[lang], ok ? UI.restoreSuccess[lang] : UI.restoreFail[lang]);
  }, [lang, restore]);

  const onReset = useCallback(() => {
    Alert.alert(UI.resetConfirmTitle[lang], UI.resetConfirmBody[lang], [
      { text: UI.cancel[lang], style: 'cancel' },
      {
        text: UI.ok[lang],
        style: 'destructive',
        onPress: () => {
          resetAll();
          router.replace('/onboarding');
        },
      },
    ]);
  }, [lang, resetAll, router]);

  const onRate = useCallback(async () => {
    const url = Platform.select({
      ios: 'https://apps.apple.com/app/daily-rashifal',
      android: 'market://details?id=com.dailyrashifal.app',
      default: 'https://dailyrashifal.app',
    });
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(UI.rate[lang], lang === 'hi' ? 'स्टोर उपलब्ध नहीं है।' : 'Store is unavailable.');
    }
  }, [lang]);

  const LinkRow = ({ icon, label, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void }) => (
    <Pressable style={styles.linkRow} onPress={onPress} accessibilityRole="button">
      <Ionicons name={icon} size={17} color={colors.gold} />
      <Text style={styles.linkLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={15} color={colors.textFaint} />
    </Pressable>
  );

  return (
    <ScreenBackground seed="settings">
      <ScreenHeader title={UI.settings[lang]} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(360)} style={[glass, styles.card, shadow(6)]}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{sign.symbol}</Text>
            </View>
            <View style={styles.flex}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{profile?.name ?? '—'}</Text>
                {isPremium ? (
                  <View style={styles.premiumTag}>
                    <Ionicons name="diamond" size={10} color="#1a1200" />
                    <Text style={styles.premiumTagText}>{UI.premium[lang]}</Text>
                  </View>
                ) : null}
              </View>
              <Text style={styles.sub}>
                {sign.name[lang]} · {UI.birthDate[lang]}: {formatShortDate(dob, lang)}
              </Text>
              <Text style={styles.sub}>
                {UI.moonSign[lang]}: {moon.symbol} {moon.name[lang]} · {UI.luckyStone[lang]}: {sign.stone[lang]}
              </Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(60).duration(360)} style={[glass, styles.card, shadow(6)]}>
          <Text style={styles.cardTitle}>{UI.language[lang]}</Text>
          <View style={styles.segment}>
            {(['hi', 'en'] as const).map((code) => (
              <Pressable key={code} onPress={() => setLanguage(code)} style={[styles.segmentItem, lang === code && styles.segmentOn]} accessibilityRole="button">
                <Text style={[styles.segmentText, lang === code && styles.textDark]}>{code === 'hi' ? 'हिंदी' : 'English'}</Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).duration(360)} style={[glass, styles.card, shadow(6)]}>
          <View style={styles.rowBetween}>
            <View style={styles.flex}>
              <Text style={styles.cardTitle}>{UI.notifications[lang]}</Text>
              <Text style={styles.hint}>{UI.reminderTime[lang]}: {reminder.hour < 10 ? `0${reminder.hour}` : reminder.hour}:{reminder.minute < 10 ? `0${reminder.minute}` : reminder.minute}</Text>
            </View>
            <Switch
              value={reminder.enabled}
              onValueChange={(value) => updateReminder(value, reminder.hour, reminder.minute)}
              trackColor={{ true: colors.gold, false: 'rgba(255,255,255,0.16)' }}
              thumbColor={colors.white}
            />
          </View>
          <Text style={styles.pickerLabel}>{lang === 'hi' ? 'घंटा' : 'Hour'}</Text>
          <FlatList
            horizontal
            data={HOURS}
            keyExtractor={(item) => `h-${item}`}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipRow}
            renderItem={({ item }) => (
              <Pressable onPress={() => updateReminder(reminder.enabled, item, reminder.minute)} style={[styles.chip, reminder.hour === item && styles.chipOn]}>
                <Text style={[styles.chipText, reminder.hour === item && styles.textDark]}>{item < 10 ? `0${item}` : item}</Text>
              </Pressable>
            )}
          />
          <Text style={styles.pickerLabel}>{lang === 'hi' ? 'मिनट' : 'Minute'}</Text>
          <FlatList
            horizontal
            data={MINUTES}
            keyExtractor={(item) => `min-${item}`}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipRow}
            renderItem={({ item }) => (
              <Pressable onPress={() => updateReminder(reminder.enabled, reminder.hour, item)} style={[styles.chip, reminder.minute === item && styles.chipOn]}>
                <Text style={[styles.chipText, reminder.minute === item && styles.textDark]}>{item < 10 ? `0${item}` : item}</Text>
              </Pressable>
            )}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(180).duration(360)} style={[glass, styles.card, shadow(6)]}>
          <Text style={styles.cardTitle}>{UI.premium[lang]}</Text>
          <Text style={styles.hint}>
            {isPremiumStore ? (lang === 'hi' ? 'सक्रिय प्लान: असीमित' : 'Active plan: unlimited') : (lang === 'hi' ? `फ्री प्लान · ${favorites.length}/50 बुकमार्क` : `Free plan · ${favorites.length}/50 bookmarks`)}
          </Text>
          {!isPremium ? (
            <Pressable style={styles.goldBtn} onPress={() => router.push('/paywall')} accessibilityRole="button">
              <Ionicons name="diamond" size={16} color="#1a1200" />
              <Text style={styles.goldBtnText}>{UI.goPremium[lang]}</Text>
            </Pressable>
          ) : null}
          <Pressable style={styles.ghostBtn} onPress={onRestore} disabled={busy} accessibilityRole="button">
            <Ionicons name={busy ? 'hourglass-outline' : 'refresh'} size={16} color={colors.gold} />
            <Text style={styles.ghostBtnText}>{UI.restore[lang]}</Text>
          </Pressable>
          <View style={styles.rowBetween}>
            <View style={styles.flex}>
              <Text style={styles.hint}>{UI.demoPremium[lang]}</Text>
            </View>
            <Switch
              value={isPremiumStore}
              onValueChange={(value) => {
                setPremium(value);
                if (value) activate(false);
              }}
              trackColor={{ true: colors.gold, false: 'rgba(255,255,255,0.16)' }}
              thumbColor={colors.white}
            />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(240).duration(360)} style={[glass, styles.card, shadow(6)]}>
          <LinkRow icon="heart-circle-outline" label={UI.kundli[lang]} onPress={() => router.push('/kundli')} />
          <LinkRow icon="calendar-clear-outline" label={UI.yearly[lang]} onPress={() => router.push('/yearly')} />
          <LinkRow icon="shield-checkmark-outline" label={UI.privacyPolicy[lang]} onPress={() => router.push('/privacy-policy')} />
          <LinkRow icon="star-outline" label={UI.rate[lang]} onPress={onRate} />
          <LinkRow icon="bookmark-outline" label={`${UI.saved[lang]} (${favorites.length})`} onPress={() => router.push('/home')} />
        </Animated.View>

        <Pressable style={styles.dangerBtn} onPress={onReset} accessibilityRole="button">
          <Ionicons name="trash-outline" size={16} color={colors.red} />
          <Text style={styles.dangerText}>{UI.reset[lang]}</Text>
        </Pressable>

        <Text style={styles.footer}>Daily Rashifal v1.0.0 · {UI.poweredBy[lang]}</Text>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl * 2, gap: spacing.md },
  flex: { flex: 1 },
  card: { padding: spacing.lg, gap: spacing.md },
  cardTitle: { color: colors.text, fontSize: fontSize.h3, fontWeight: '800' },
  hint: { color: colors.textDim, fontSize: fontSize.small },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(245,158,11,0.14)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarText: { fontSize: 26, color: colors.gold, fontWeight: '800' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  name: { color: colors.text, fontSize: fontSize.h2, fontWeight: '900' },
  premiumTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.gold,
  },
  premiumTagText: { color: '#1a1200', fontSize: 10, fontWeight: '900' },
  sub: { color: colors.textDim, fontSize: fontSize.small, marginTop: 3 },
  segment: { flexDirection: 'row', gap: spacing.sm, backgroundColor: 'rgba(255,255,255,0.05)', padding: 4, borderRadius: radius.pill },
  segmentItem: { flex: 1, alignItems: 'center', paddingVertical: spacing.sm, borderRadius: radius.pill },
  segmentOn: { backgroundColor: colors.gold },
  segmentText: { color: colors.textDim, fontWeight: '800', fontSize: fontSize.small },
  textDark: { color: '#1a1200' },
  rowBetween: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  pickerLabel: { color: colors.textFaint, fontSize: fontSize.tiny, fontWeight: '700', textTransform: 'uppercase' },
  chipRow: { gap: spacing.sm },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    minWidth: 44,
    alignItems: 'center',
  },
  chipOn: { backgroundColor: colors.gold, borderColor: colors.goldLight },
  chipText: { color: colors.textDim, fontSize: fontSize.small, fontWeight: '700' },
  goldBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.gold,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
  },
  goldBtnText: { color: '#1a1200', fontWeight: '900', fontSize: fontSize.body },
  ghostBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(245,158,11,0.08)',
  },
  ghostBtnText: { color: colors.goldLight, fontWeight: '700', fontSize: fontSize.small },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderSoft,
  },
  linkLabel: { color: colors.text, fontSize: fontSize.body, fontWeight: '600', flex: 1 },
  dangerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(248,113,113,0.4)',
    backgroundColor: 'rgba(248,113,113,0.08)',
  },
  dangerText: { color: colors.red, fontWeight: '700', fontSize: fontSize.small },
  footer: { color: colors.textFaint, fontSize: fontSize.tiny, textAlign: 'center', marginTop: spacing.md },
});
