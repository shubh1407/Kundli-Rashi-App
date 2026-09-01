import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import PremiumGate from '@/components/PremiumGate';
import ScreenBackground from '@/components/ScreenBackground';
import ScreenHeader from '@/components/ScreenHeader';
import StarRating from '@/components/StarRating';
import { colors, fontSize, glass, radius, shadow, spacing } from '@/constants/theme';
import { usePremium } from '@/hooks/usePremium';
import { useStore } from '@/store/useStore';
import { buildYearlyShareText, getYearlyMonth } from '@/utils/contentEngine';
import { MONTHS, UI } from '@/utils/i18n';
import { getSign } from '@/utils/zodiacData';

const CURRENT_YEAR = new Date().getFullYear();

export default function Yearly() {
  const router = useRouter();
  const lang = useStore((s) => s.language);
  const profile = useStore((s) => s.profile);
  const { isLocked } = usePremium();

  const [year, setYear] = useState(CURRENT_YEAR);
  const sign = getSign(profile?.signId ?? 0);
  const locked = isLocked('yearly');

  const months = useMemo(
    () => Array.from({ length: 12 }, (_, index) => getYearlyMonth(sign.id, year, index)),
    [sign.id, year],
  );

  const onShare = useCallback(async () => {
    const text = buildYearlyShareText(sign.id, year, lang);
    try {
      if (Platform.OS === 'web') {
        const nav = navigator as Navigator & { clipboard?: { writeText: (value: string) => Promise<void> } };
        if (nav.clipboard) {
          await nav.clipboard.writeText(text);
          Alert.alert(UI.yearly[lang], lang === 'hi' ? 'वार्षिक राशिफल कॉपी हो गया।' : 'Yearly rashifal copied.');
        } else {
          Alert.alert(UI.yearly[lang], text);
        }
        return;
      }
      await Share.share({ message: text, title: `${UI.yearly[lang]} ${year}` });
    } catch {
      // dismissed
    }
  }, [lang, sign.id, year]);

  return (
    <ScreenBackground seed={`yearly-${year}-${sign.id}`}>
      <ScreenHeader title={UI.yearly[lang]} subtitle={`${sign.symbol} ${sign.name[lang]} · ${year}`} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.yearRow}>
          <Pressable onPress={() => setYear((y) => Math.max(2020, y - 1))} style={styles.yearBtn} accessibilityRole="button">
            <Ionicons name="chevron-back" size={18} color={colors.text} />
          </Pressable>
          <View style={styles.yearBox}>
            <Text style={styles.yearText}>{year}</Text>
            <Text style={styles.yearSub}>
              {lang === 'hi' ? '12 महीनों का फल' : '12 months of readings'}
            </Text>
          </View>
          <Pressable onPress={() => setYear((y) => Math.min(2035, y + 1))} style={styles.yearBtn} accessibilityRole="button">
            <Ionicons name="chevron-forward" size={18} color={colors.text} />
          </Pressable>
        </View>

        <PremiumGate locked={locked} onUpgrade={() => router.push('/paywall')}>
          <View style={styles.list}>
            {months.map((month, index) => (
              <Animated.View key={`month-${index}`} entering={FadeInDown.delay(index * 45).duration(420)} style={[glass, styles.monthCard, shadow(5)]}>
                <View style={styles.monthHead}>
                  <View style={styles.monthBadge}>
                    <Text style={styles.monthBadgeText}>{MONTHS[index][lang].slice(0, 3)}</Text>
                  </View>
                  <View style={styles.flex}>
                    <Text style={styles.monthTitle}>{MONTHS[index][lang]}</Text>
                    <Text style={styles.monthScore}>
                      {UI.fortune[lang]} {month.score}%
                    </Text>
                  </View>
                  <StarRating rating={month.stars} size={14} />
                </View>
                <Text style={styles.monthBody}>{month.text[lang]}</Text>
              </Animated.View>
            ))}
          </View>
        </PremiumGate>

        {!locked ? (
          <Pressable style={styles.shareBtn} onPress={onShare} accessibilityRole="button">
            <Ionicons name="share-social" size={16} color="#1a1200" />
            <Text style={styles.shareText}>{UI.share[lang]} · {year}</Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl * 2, gap: spacing.md },
  flex: { flex: 1 },
  yearRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  yearBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  yearBox: { flex: 1, alignItems: 'center' },
  yearText: { color: colors.text, fontSize: fontSize.display, fontWeight: '900' },
  yearSub: { color: colors.textDim, fontSize: fontSize.tiny },
  list: { gap: spacing.md },
  monthCard: { padding: spacing.lg, gap: spacing.sm },
  monthHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  monthBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(245,158,11,0.14)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  monthBadgeText: { color: colors.gold, fontSize: fontSize.tiny, fontWeight: '900' },
  monthTitle: { color: colors.text, fontSize: fontSize.h3, fontWeight: '800' },
  monthScore: { color: colors.textDim, fontSize: fontSize.tiny, marginTop: 2 },
  monthBody: { color: colors.textDim, fontSize: fontSize.small, lineHeight: 22 },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.gold,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
  },
  shareText: { color: '#1a1200', fontWeight: '900', fontSize: fontSize.body },
});
