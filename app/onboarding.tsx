import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInRight } from 'react-native-reanimated';
import ScreenBackground from '@/components/ScreenBackground';
import { GOLD_GRADIENT, colors, fontSize, glass, radius, shadow, spacing } from '@/constants/theme';
import { useStore } from '@/store/useStore';
import { UI, MONTHS, formatShortDate } from '@/utils/i18n';
import { applyReminder } from '@/utils/notifications';
import { moonSignFromDate } from '@/utils/panchangData';
import { SIGNS, getSign, signFromDate } from '@/utils/zodiacData';

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 75 }, (_, i) => CURRENT_YEAR - i);

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export default function Onboarding() {
  const router = useRouter();
  const lang = useStore((s) => s.language);
  const completeOnboarding = useStore((s) => s.completeOnboarding);
  const reminder = useStore((s) => s.reminder);

  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(CURRENT_YEAR - 26);
  const [signTouched, setSignTouched] = useState(false);
  const [signId, setSignId] = useState(0);

  const suggested = useMemo(() => signFromDate(new Date(year, month, day)), [year, month, day]);

  useEffect(() => {
    if (!signTouched) setSignId(suggested);
  }, [suggested, signTouched]);

  const dob = useMemo(() => new Date(year, month, day), [year, month, day]);
  const sign = getSign(signId);

  const canContinue = step !== 1 || day > 0;

  const onFinish = () => {
    const finalSign = signTouched ? signId : suggested;
    completeOnboarding({
      name: name.trim() || (lang === 'hi' ? 'शुक्र अनुयायी' : 'Star seeker'),
      dob: `${year}-${pad(month + 1)}-${pad(day)}`,
      signId: finalSign,
      moonSignId: moonSignFromDate(dob),
    });
    applyReminder(reminder.enabled, reminder.hour, reminder.minute, finalSign, lang);
    router.replace('/home');
  };

  return (
    <ScreenBackground seed="onboarding">
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.stepRow}>
            {[0, 1, 2, 3].map((i) => (
              <View key={`step-${i}`} style={[styles.stepDot, i <= step && styles.stepDotOn]} />
            ))}
          </View>

          {step === 0 ? (
            <Animated.View entering={FadeIn.duration(420)} style={styles.centerBlock}>
              <LinearGradient colors={GOLD_GRADIENT} style={[styles.logo, shadow(14)]}>
                <Text style={styles.logoText}>✦</Text>
              </LinearGradient>
              <Text style={styles.title}>{UI.welcomeTitle[lang]}</Text>
              <Text style={styles.body}>{UI.welcomeBody[lang]}</Text>
              <View style={styles.signRow}>
                {SIGNS.map((s) => (
                  <Text key={`sym-${s.id}`} style={styles.miniSymbol}>
                    {s.symbol}
                  </Text>
                ))}
              </View>
            </Animated.View>
          ) : null}

          {step === 1 ? (
            <Animated.View entering={FadeInRight.duration(360)} style={styles.block}>
              <Text style={styles.title}>{UI.yourName[lang]}</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder={UI.namePlaceholder[lang]}
                placeholderTextColor={colors.textFaint}
                style={styles.input}
                returnKeyType="done"
                maxLength={28}
                autoCapitalize="words"
              />

              <Text style={[styles.title, styles.mt]}>{UI.birthDate[lang]}</Text>
              <Text style={styles.hint}>{formatShortDate(dob, lang)}</Text>

              <Text style={styles.pickerLabel}>{UI.day[lang]}</Text>
              <FlatList
                horizontal
                data={DAYS}
                keyExtractor={(item) => `d-${item}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.pickerRow}
                renderItem={({ item }) => (
                  <Pressable onPress={() => setDay(item)} style={[styles.chip, day === item && styles.chipOn]}>
                    <Text style={[styles.chipText, day === item && styles.chipTextOn]}>{item}</Text>
                  </Pressable>
                )}
              />

              <Text style={styles.pickerLabel}>{UI.month[lang]}</Text>
              <FlatList
                horizontal
                data={MONTHS}
                keyExtractor={(_, index) => `m-${index}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.pickerRow}
                renderItem={({ item, index }) => (
                  <Pressable onPress={() => setMonth(index)} style={[styles.chip, month === index && styles.chipOn]}>
                    <Text style={[styles.chipText, month === index && styles.chipTextOn]}>{item[lang]}</Text>
                  </Pressable>
                )}
              />

              <Text style={styles.pickerLabel}>{UI.year[lang]}</Text>
              <FlatList
                horizontal
                data={YEARS}
                keyExtractor={(item) => `y-${item}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.pickerRow}
                renderItem={({ item }) => (
                  <Pressable onPress={() => setYear(item)} style={[styles.chip, year === item && styles.chipOn]}>
                    <Text style={[styles.chipText, year === item && styles.chipTextOn]}>{item}</Text>
                  </Pressable>
                )}
              />
            </Animated.View>
          ) : null}

          {step === 2 ? (
            <Animated.View entering={FadeInRight.duration(360)} style={styles.block}>
              <Text style={styles.title}>{UI.chooseSign[lang]}</Text>
              <View style={styles.badgeRow}>
                <View style={styles.suggestBadge}>
                  <Ionicons name="sparkles" size={12} color={colors.gold} />
                  <Text style={styles.suggestText}>
                    {UI.suggested[lang]}: {getSign(suggested).name[lang]} {getSign(suggested).symbol}
                  </Text>
                </View>
              </View>
              <FlatList
                data={SIGNS}
                keyExtractor={(item) => `sign-${item.id}`}
                numColumns={3}
                scrollEnabled={false}
                columnWrapperStyle={styles.gridRow}
                contentContainerStyle={styles.grid}
                renderItem={({ item }) => {
                  const active = item.id === signId;
                  return (
                    <Pressable
                      onPress={() => {
                        setSignTouched(true);
                        setSignId(item.id);
                      }}
                      style={[styles.signCell, active && styles.signCellOn]}
                      accessibilityRole="button"
                      accessibilityState={{ selected: active }}
                    >
                      <Text style={[styles.signSymbol, active && styles.textDark]}>{item.symbol}</Text>
                      <Text style={[styles.signName, active && styles.textDark]}>{item.name[lang]}</Text>
                      <Text style={[styles.signRange, active && styles.textDarkMuted]}>{item.dateRange[lang]}</Text>
                    </Pressable>
                  );
                }}
              />
            </Animated.View>
          ) : null}

          {step === 3 ? (
            <Animated.View entering={FadeInDown.duration(420)} style={styles.centerBlock}>
              <LinearGradient colors={GOLD_GRADIENT} style={[styles.logo, shadow(14)]}>
                <Text style={styles.logoText}>{sign.symbol}</Text>
              </LinearGradient>
              <Text style={styles.title}>{sign.name[lang]} · {sign.name[lang === 'hi' ? 'en' : 'hi']}</Text>
              <Text style={styles.body}>
                {sign.element[lang]} · {sign.planet[lang]} · {sign.trait[lang]}
              </Text>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLine}>
                  {UI.birthDate[lang]}: {formatShortDate(dob, lang)}
                </Text>
                <Text style={styles.summaryLine}>
                  {UI.moonSign[lang]}: {getSign(moonSignFromDate(dob)).symbol} {getSign(moonSignFromDate(dob)).name[lang]}
                </Text>
                <Text style={styles.summaryLine}>
                  {UI.luckyStone[lang]}: {sign.stone[lang]} · {UI.luckyColor[lang]}: {sign.luckyColor[lang]}
                </Text>
              </View>
            </Animated.View>
          ) : null}

          <View style={styles.actions}>
            {step > 0 ? (
              <Pressable onPress={() => setStep(step - 1)} style={styles.secondaryBtn} accessibilityRole="button">
                <Ionicons name="chevron-back" size={16} color={colors.textDim} />
                <Text style={styles.secondaryText}>{UI.back[lang]}</Text>
              </Pressable>
            ) : null}

            <Pressable
              disabled={!canContinue}
              onPress={() => (step === 3 ? onFinish() : setStep(step + 1))}
              style={[styles.primaryBtn, !canContinue && { opacity: 0.4 }]}
              accessibilityRole="button"
            >
              <Text style={styles.primaryText}>{step === 0 ? UI.getStarted[lang] : step === 3 ? UI.finish[lang] : UI.continueLabel[lang]}</Text>
              <Ionicons name="arrow-forward" size={16} color="#1a1200" />
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl * 2, paddingTop: spacing.lg, flexGrow: 1 },
  stepRow: { flexDirection: 'row', gap: 6, justifyContent: 'center', marginBottom: spacing.xl },
  stepDot: { width: 22, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.14)' },
  stepDotOn: { backgroundColor: colors.gold },
  centerBlock: { alignItems: 'center', gap: spacing.md, paddingTop: spacing.xl },
  block: { gap: spacing.sm },
  logo: { width: 92, height: 92, borderRadius: 46, alignItems: 'center', justifyContent: 'center' },
  logoText: { fontSize: 42, color: '#1a1200', fontWeight: '900' },
  title: { color: colors.text, fontSize: fontSize.h1, fontWeight: '900', textAlign: 'center' },
  body: { color: colors.textDim, fontSize: fontSize.body, textAlign: 'center', lineHeight: 23, paddingHorizontal: spacing.md },
  hint: { color: colors.goldLight, fontSize: fontSize.small, fontWeight: '700', marginBottom: spacing.xs },
  signRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginTop: spacing.md },
  miniSymbol: { color: 'rgba(245,158,11,0.65)', fontSize: 18 },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    color: colors.text,
    fontSize: fontSize.body,
  },
  mt: { marginTop: spacing.lg },
  pickerLabel: { color: colors.textFaint, fontSize: fontSize.tiny, fontWeight: '700', marginTop: spacing.md, marginBottom: spacing.xs, textTransform: 'uppercase' },
  pickerRow: { gap: spacing.sm, paddingRight: spacing.lg },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    minWidth: 46,
    alignItems: 'center',
  },
  chipOn: { backgroundColor: colors.gold, borderColor: colors.goldLight },
  chipText: { color: colors.textDim, fontSize: fontSize.small, fontWeight: '700' },
  chipTextOn: { color: '#1a1200' },
  badgeRow: { flexDirection: 'row', marginBottom: spacing.md },
  suggestBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(245,158,11,0.12)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  suggestText: { color: colors.goldLight, fontSize: fontSize.tiny, fontWeight: '700' },
  grid: { gap: spacing.sm },
  gridRow: { gap: spacing.sm },
  signCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    gap: 2,
  },
  signCellOn: { backgroundColor: colors.gold, borderColor: colors.goldLight },
  signSymbol: { fontSize: 22, color: colors.gold, fontWeight: '800' },
  signName: { fontSize: fontSize.small, color: colors.text, fontWeight: '700' },
  signRange: { fontSize: 9, color: colors.textFaint },
  textDark: { color: '#1a1200' },
  textDarkMuted: { color: 'rgba(26,18,0,0.7)' },
  summaryCard: { ...glass, padding: spacing.lg, gap: spacing.sm, marginTop: spacing.md, width: '100%' },
  summaryLine: { color: colors.text, fontSize: fontSize.small, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl, alignItems: 'center' },
  primaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.gold,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
  },
  primaryText: { color: '#1a1200', fontWeight: '900', fontSize: fontSize.body },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  secondaryText: { color: colors.textDim, fontWeight: '700', fontSize: fontSize.small },
});
