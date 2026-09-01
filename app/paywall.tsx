import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenBackground from '@/components/ScreenBackground';
import { GOLD_GRADIENT, colors, fontSize, glass, radius, shadow, spacing } from '@/constants/theme';
import { usePremium } from '@/hooks/usePremium';
import { useStore } from '@/store/useStore';
import { UI } from '@/utils/i18n';

type PlanId = 'monthly' | 'yearly' | 'lifetime';

const PLANS: { id: PlanId; price: string; period: { en: string; hi: string }; note: { en: string; hi: string }; badge?: boolean }[] = [
  { id: 'monthly', price: '₹99', period: UI.perMonth, note: { en: 'Billed monthly, cancel anytime', hi: 'मासिक बिलिंग, कभी भी रद्द करें' } },
  { id: 'yearly', price: '₹299', period: UI.perYear, note: { en: 'Just ₹25/month · save 75%', hi: 'सिर्फ़ ₹25/माह · 75% बचत' }, badge: true },
  { id: 'lifetime', price: '₹999', period: UI.lifetimeNote, note: { en: 'One payment, yours forever', hi: 'एक बार भुगतान, हमेशा के लिए' } },
];

const FEATURES: { en: string; hi: string }[] = [
  { en: 'Weekly & monthly rashifal for all 12 signs', hi: '12 राशियों के साप्ताहिक व मासिक राशिफल' },
  { en: 'Kundli matching with 5-aspect compatibility', hi: '5 पहलुओं वाला कुंडली मिलान' },
  { en: 'Full year monthly horoscope', hi: 'पूरे साल का मासिक राशिफल' },
  { en: 'Unlimited bookmarks (free plan allows 50)', hi: 'असीमित बुकमार्क (फ्री में 50)' },
  { en: 'Share rashifal images in one tap', hi: 'एक टैप में राशिफल चित्र साझा करें' },
];

export default function Paywall() {
  const router = useRouter();
  const lang = useStore((s) => s.language);
  const { activate, restore } = usePremium();
  const [plan, setPlan] = useState<PlanId>('yearly');
  const [busy, setBusy] = useState(false);

  const onPurchase = useCallback(async () => {
    setBusy(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    activate(plan === 'lifetime');
    setBusy(false);
    Alert.alert(UI.premium[lang], UI.purchaseSuccess[lang], [
      {
        text: UI.ok[lang],
        onPress: () => router.replace('/home'),
      },
    ]);
  }, [activate, lang, plan, router]);

  const onRestore = useCallback(async () => {
    setBusy(true);
    const ok = await restore();
    setBusy(false);
    Alert.alert(UI.restore[lang], ok ? UI.restoreSuccess[lang] : UI.restoreFail[lang]);
    if (ok) router.replace('/home');
  }, [lang, restore, router]);

  return (
    <ScreenBackground seed="paywall">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.close} onPress={() => router.back()} accessibilityRole="button" accessibilityLabel={UI.close[lang]}>
          <Ionicons name="close" size={20} color={colors.text} />
        </Pressable>

        <Animated.View entering={FadeInDown.duration(400)} style={styles.hero}>
          <LinearGradient colors={GOLD_GRADIENT} style={[styles.crown, shadow(12)]}>
            <Ionicons name="diamond" size={30} color="#1a1200" />
          </LinearGradient>
          <Text style={styles.title}>{UI.premiumTitle[lang]}</Text>
          <Text style={styles.subtitle}>{UI.premiumBody[lang]}</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(80).duration(400)} style={[glass, styles.features, shadow(6)]}>
          {FEATURES.map((feature, index) => (
            <View key={`feature-${index}`} style={styles.featureRow}>
              <View style={styles.check}>
                <Ionicons name="checkmark" size={12} color="#1a1200" />
              </View>
              <Text style={styles.featureText}>{feature[lang]}</Text>
            </View>
          ))}
        </Animated.View>

        <View style={styles.plans}>
          {PLANS.map((item, index) => {
            const active = item.id === plan;
            return (
              <Animated.View key={item.id} entering={FadeInDown.delay(140 + index * 60).duration(400)} style={styles.flex}>
                <Pressable onPress={() => setPlan(item.id)} style={[glass, styles.plan, active && styles.planOn, shadow(5)]} accessibilityRole="radio" accessibilityState={{ selected: active }}>
                  {item.badge ? (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{UI.bestValue[lang]}</Text>
                    </View>
                  ) : null}
                  <Text style={[styles.planPrice, active && styles.textDark]}>{item.price}</Text>
                  <Text style={[styles.planPeriod, active && styles.textDarkMuted]}>{item.period[lang]}</Text>
                  <Text style={[styles.planNote, active && styles.textDarkMuted]}>{item.note[lang]}</Text>
                </Pressable>
              </Animated.View>
            );
          })}
        </View>

        <Pressable onPress={onPurchase} disabled={busy} style={[styles.buy, shadow(10)]} accessibilityRole="button">
          {busy ? <ActivityIndicator color="#1a1200" /> : <Ionicons name="sparkles" size={16} color="#1a1200" />}
          <Text style={styles.buyText}>{busy ? (lang === 'hi' ? 'जारी है…' : 'Processing…') : `${UI.choosePlan[lang]} · ${PLANS.find((p) => p.id === plan)?.price}`}</Text>
        </Pressable>

        <Pressable onPress={onRestore} disabled={busy} style={styles.restore} accessibilityRole="button">
          <Ionicons name="refresh" size={15} color={colors.gold} />
          <Text style={styles.restoreText}>{UI.restore[lang]}</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/privacy-policy')} style={styles.link}>
          <Text style={styles.linkText}>{UI.privacyPolicy[lang]} · Terms</Text>
        </Pressable>

        <Text style={styles.disclaimer}>
          {lang === 'hi'
            ? 'नोट: यह डेमो बिलिंग है — कोई वास्तविक शुल्क नहीं लिया जाता।'
            : 'Note: this is a demo billing flow — no real charge is made.'}
        </Text>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl * 2, gap: spacing.lg },
  flex: { flex: 1 },
  close: {
    alignSelf: 'flex-end',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  hero: { alignItems: 'center', gap: spacing.sm },
  crown: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.text, fontSize: fontSize.display, fontWeight: '900', textAlign: 'center' },
  subtitle: { color: colors.textDim, fontSize: fontSize.body, textAlign: 'center', lineHeight: 22, paddingHorizontal: spacing.md },
  features: { padding: spacing.lg, gap: spacing.md },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gold,
  },
  featureText: { color: colors.text, fontSize: fontSize.small, flex: 1, lineHeight: 20 },
  plans: { flexDirection: 'row', gap: spacing.sm },
  plan: { padding: spacing.md, gap: 2, minHeight: 128, borderWidth: 1 },
  planOn: { backgroundColor: 'rgba(245,158,11,0.16)', borderColor: colors.gold },
  planPrice: { color: colors.text, fontSize: fontSize.h1, fontWeight: '900' },
  planPeriod: { color: colors.textDim, fontSize: fontSize.tiny, fontWeight: '700' },
  planNote: { color: colors.textFaint, fontSize: 10, marginTop: 6, lineHeight: 14 },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.gold,
    marginBottom: 4,
  },
  badgeText: { color: '#1a1200', fontSize: 9, fontWeight: '900' },
  textDark: { color: '#1a1200' },
  textDarkMuted: { color: 'rgba(26,18,0,0.75)' },
  buy: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.gold,
    paddingVertical: spacing.lg,
    borderRadius: radius.pill,
  },
  buyText: { color: '#1a1200', fontWeight: '900', fontSize: fontSize.body },
  restore: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  restoreText: { color: colors.goldLight, fontSize: fontSize.small, fontWeight: '700' },
  link: { alignItems: 'center' },
  linkText: { color: colors.textFaint, fontSize: fontSize.tiny, textDecorationLine: 'underline' },
  disclaimer: { color: colors.textFaint, fontSize: 10, textAlign: 'center', lineHeight: 15 },
});
