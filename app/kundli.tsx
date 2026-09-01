import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, FlatList, Platform, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CompatibilityRing from '@/components/CompatibilityRing';
import PremiumGate from '@/components/PremiumGate';
import ScreenBackground from '@/components/ScreenBackground';
import ScreenHeader from '@/components/ScreenHeader';
import { colors, fontSize, glass, radius, shadow, spacing } from '@/constants/theme';
import { usePremium } from '@/hooks/usePremium';
import { useStore } from '@/store/useStore';
import { buildKundliShareText, getCompatibility, type Compatibility } from '@/utils/contentEngine';
import { UI } from '@/utils/i18n';
import { SIGNS, getSign } from '@/utils/zodiacData';

function SignPicker({ value, onChange, label }: { value: number; onChange: (id: number) => void; label: string }) {
  const lang = useStore((s) => s.language);
  return (
    <View style={styles.pickerWrap}>
      <Text style={styles.pickerLabel}>{label}</Text>
      <FlatList
        horizontal
        data={SIGNS}
        keyExtractor={(item) => `pick-${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pickerRow}
        renderItem={({ item }) => {
          const active = item.id === value;
          return (
            <Pressable onPress={() => onChange(item.id)} style={[styles.pickChip, active && styles.pickChipOn]} accessibilityRole="button">
              <Text style={[styles.pickSymbol, active && styles.textDark]}>{item.symbol}</Text>
              <Text style={[styles.pickName, active && styles.textDark]}>{item.name[lang]}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

function AspectBar({ label, value, index }: { label: string; value: number; index: number }) {
  return (
    <Animated.View entering={FadeInDown.delay(120 + index * 70).duration(420)} style={styles.aspectRow}>
      <Text style={styles.aspectLabel}>{label}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${value}%` }]} />
      </View>
      <Text style={styles.aspectValue}>{value}%</Text>
    </Animated.View>
  );
}

export default function Kundli() {
  const router = useRouter();
  const lang = useStore((s) => s.language);
  const profile = useStore((s) => s.profile);
  const { isLocked } = usePremium();

  const [aId, setAId] = useState(profile?.signId ?? 0);
  const [bId, setBId] = useState((profile?.signId ?? 0) % 12);
  const [result, setResult] = useState<Compatibility | null>(null);

  const locked = isLocked('kundli');

  const onMatch = useCallback(() => {
    setResult(getCompatibility(aId, bId));
  }, [aId, bId]);

  const onShare = useCallback(async () => {
    if (!result) return;
    const text = buildKundliShareText(result, lang);
    try {
      if (Platform.OS === 'web') {
        const nav = navigator as Navigator & { clipboard?: { writeText: (value: string) => Promise<void> } };
        if (nav.clipboard) {
          await nav.clipboard.writeText(text);
          Alert.alert(UI.kundli[lang], lang === 'hi' ? 'परिणाम कॉपी हो गया।' : 'Result copied to clipboard.');
        } else {
          Alert.alert(UI.kundli[lang], text);
        }
        return;
      }
      await Share.share({ message: text, title: UI.kundli[lang] });
    } catch {
      // dismissed
    }
  }, [lang, result]);

  const a = getSign(aId);
  const b = getSign(bId);

  return (
    <ScreenBackground seed={`kundli-${aId}-${bId}`}>
      <ScreenHeader title={UI.kundli[lang]} subtitle={UI.kundliSubtitle[lang]} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>{UI.selectSigns[lang]}</Text>

        <SignPicker value={aId} onChange={setAId} label={`${UI.a[lang]} · ${a.symbol} ${a.name[lang]}`} />
        <View style={styles.plusRow}>
          <View style={styles.plusLine} />
          <View style={styles.plusCircle}>
            <Ionicons name="heart" size={14} color={colors.gold} />
          </View>
          <View style={styles.plusLine} />
        </View>
        <SignPicker value={bId} onChange={setBId} label={`${UI.b[lang]} · ${b.symbol} ${b.name[lang]}`} />

        <Pressable style={styles.matchBtn} onPress={onMatch} accessibilityRole="button">
          <Ionicons name="sparkles" size={16} color="#1a1200" />
          <Text style={styles.matchText}>{UI.match[lang]}</Text>
        </Pressable>

        {result ? (
          <PremiumGate
            locked={locked}
            onUpgrade={() => router.push('/paywall')}
            title={UI.lockedTitle[lang]}
            body={lang === 'hi' ? 'कुंडली मिलान के पूरे परिणाम, 5 पहलुओं का विश्लेषण और साझा करने की सुविधा प्रीमियम में है।' : 'Full kundli results, 5-aspect breakdown and sharing are part of Premium.'}
          >
            <Animated.View entering={FadeInDown.duration(420)} style={[glass, styles.resultCard, shadow(10)]}>
              <View style={styles.pairRow}>
                <Text style={styles.pairSign}>
                  {a.symbol} {a.name[lang]}
                </Text>
                <Ionicons name="add" size={16} color={colors.gold} />
                <Text style={styles.pairSign}>
                  {b.symbol} {b.name[lang]}
                </Text>
              </View>

              <CompatibilityRing score={result.score} caption={result.bond[lang]} subCaption={`${UI.compatibility[lang]} · ${a.name[lang]} + ${b.name[lang]}`} />

              <View style={styles.divider} />

              <Text style={styles.aspectHeading}>{lang === 'hi' ? 'पाँच पहलुओं का विश्लेषण' : 'Five aspect breakdown'}</Text>
              {result.aspects.map((aspect, index) => (
                <AspectBar key={aspect.key} label={aspect.label[lang]} value={aspect.value} index={index} />
              ))}

              <View style={styles.summaryBox}>
                <View style={styles.summaryHead}>
                  <Ionicons name="reader-outline" size={15} color={colors.gold} />
                  <Text style={styles.summaryTitle}>{UI.summary[lang]}</Text>
                </View>
                <Text style={styles.summaryText}>{result.summary[lang]}</Text>
              </View>

              <Pressable style={styles.shareBtn} onPress={onShare} accessibilityRole="button">
                <Ionicons name="share-social" size={16} color="#1a1200" />
                <Text style={styles.shareText}>{UI.shareResult[lang]}</Text>
              </Pressable>
            </Animated.View>
          </PremiumGate>
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="git-compare-outline" size={26} color={colors.gold} />
            <Text style={styles.placeholderText}>
              {lang === 'hi' ? 'दो राशियाँ चुनें और मिलान करें — परिणाम 1 से 100% तक होगा।' : 'Pick two signs and tap match — the score runs from 1% to 100%.'}
            </Text>
          </View>
        )}
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl * 2, gap: spacing.md },
  sectionTitle: { color: colors.text, fontSize: fontSize.h3, fontWeight: '800' },
  pickerWrap: { gap: spacing.sm },
  pickerLabel: { color: colors.textDim, fontSize: fontSize.small, fontWeight: '700' },
  pickerRow: { gap: spacing.sm },
  pickChip: {
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    minWidth: 74,
  },
  pickChipOn: { backgroundColor: colors.gold, borderColor: colors.goldLight },
  pickSymbol: { fontSize: 17, color: colors.gold, fontWeight: '800' },
  pickName: { fontSize: fontSize.tiny, color: colors.textDim, fontWeight: '700' },
  textDark: { color: '#1a1200' },
  plusRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  plusLine: { flex: 1, height: 1, backgroundColor: colors.borderSoft },
  plusCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(245,158,11,0.14)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  matchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.gold,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
  },
  matchText: { color: '#1a1200', fontWeight: '900', fontSize: fontSize.body },
  resultCard: { padding: spacing.lg, gap: spacing.lg },
  pairRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  pairSign: { color: colors.text, fontSize: fontSize.body, fontWeight: '800' },
  divider: { height: 1, backgroundColor: colors.borderSoft },
  aspectHeading: { color: colors.text, fontSize: fontSize.body, fontWeight: '800' },
  aspectRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  aspectLabel: { color: colors.textDim, fontSize: fontSize.small, width: 108, fontWeight: '600' },
  track: { flex: 1, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4, backgroundColor: colors.gold },
  aspectValue: { color: colors.goldLight, fontSize: fontSize.small, fontWeight: '800', width: 44, textAlign: 'right' },
  summaryBox: {
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: 'rgba(245,158,11,0.07)',
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  summaryHead: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  summaryTitle: { color: colors.goldLight, fontSize: fontSize.small, fontWeight: '800' },
  summaryText: { color: colors.text, fontSize: fontSize.small, lineHeight: 21 },
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
  placeholder: {
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.xl,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
  },
  placeholderText: { color: colors.textDim, fontSize: fontSize.small, textAlign: 'center', lineHeight: 20 },
});
