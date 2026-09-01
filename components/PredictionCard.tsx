import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ViewShot, { type ViewShotRef } from 'react-native-view-shot';
import StarRating from '@/components/StarRating';
import { GOLD_GRADIENT, colors, fontSize, glass, radius, shadow, spacing } from '@/constants/theme';
import { usePremium } from '@/hooks/usePremium';
import { useStore } from '@/store/useStore';
import { UI, formatLongDate } from '@/utils/i18n';
import { CATEGORY_META, type Category, type Period } from '@/utils/predictionTemplates';
import { getSign } from '@/utils/zodiacData';
import type { Prediction } from '@/utils/contentEngine';

type Props = {
  prediction: Prediction;
  shotRef?: React.RefObject<ViewShotRef | null>;
  delay?: number;
};

const PERIOD_LABEL: Record<Period, { en: string; hi: string }> = {
  daily: { en: 'Daily', hi: 'दैनिक' },
  weekly: { en: 'Weekly', hi: 'साप्ताहिक' },
  monthly: { en: 'Monthly', hi: 'मासिक' },
};

/** Glassmorphism prediction card — bookmarkable and shareable (text + image). */
export default function PredictionCard({ prediction, shotRef, delay = 0 }: Props) {
  const lang = useStore((s) => s.language);
  const favorites = useStore((s) => s.favorites);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const { isPremium } = usePremium();

  const sign = getSign(prediction.signId);
  const meta = CATEGORY_META[prediction.category as Category];
  const saved = favorites.some((f) => f.id === prediction.id);

  const onPressBookmark = () => {
    const result = toggleFavorite(
      {
        id: prediction.id,
        signId: prediction.signId,
        category: prediction.category,
        period: prediction.period,
        dateKey: prediction.dateKey,
        stars: prediction.stars,
        score: prediction.score,
        title: { en: `${sign.name.en} · ${meta.label.en}`, hi: `${sign.name.hi} · ${meta.label.hi}` },
        savedAt: Date.now(),
      },
      isPremium,
    );
    if (!result.ok) {
      Alert.alert(UI.savedMaxTitle[lang], UI.bookmarkMax[lang]);
    }
  };

  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(420)}>
      <ViewShot ref={shotRef} options={{ format: 'png', quality: 1 }}>
        <View style={[glass, styles.card, shadow(10)]}>
          <View style={styles.header}>
            <LinearGradient colors={GOLD_GRADIENT} style={styles.avatar}>
              <Text style={styles.symbol}>{sign.symbol}</Text>
            </LinearGradient>
            <View style={styles.headerText}>
              <Text style={styles.title}>
                {sign.name[lang]} · {sign.name[lang === 'hi' ? 'en' : 'hi']}
              </Text>
              <Text style={styles.subtitle}>
                {PERIOD_LABEL[prediction.period][lang]} · {meta.label[lang]} · {formatLongDate(prediction.date, lang)}
              </Text>
            </View>
            <Pressable
              onPress={onPressBookmark}
              hitSlop={10}
              style={styles.bookmark}
              accessibilityRole="button"
              accessibilityLabel={saved ? UI.saved[lang] : UI.choose[lang]}
            >
              <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={20} color={saved ? colors.gold : colors.textDim} />
            </Pressable>
          </View>

          <View style={styles.scoreRow}>
            <StarRating rating={prediction.stars} size={17} />
            <View style={styles.scorePill}>
              <Ionicons name="sparkles" size={12} color={colors.gold} />
              <Text style={styles.scoreText}>
                {UI.fortune[lang]} {prediction.score}%
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {prediction.paragraphs.map((paragraph, index) => (
            <Text key={`para-${index}`} style={styles.paragraph}>
              {paragraph[lang]}
            </Text>
          ))}

          <View style={styles.verdict}>
            <Ionicons name="diamond-outline" size={14} color={colors.gold} />
            <Text style={styles.verdictText}>{prediction.verdict[lang]}</Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.chip}>
              <Ionicons name="happy-outline" size={13} color={colors.gold} />
              <Text style={styles.chipText}>
                {UI.mood[lang]}: {prediction.mood[lang]}
              </Text>
            </View>
            <View style={styles.chip}>
              <Ionicons name="diamond-outline" size={13} color={colors.gold} />
              <Text style={styles.chipText}>
                {UI.luckyStone[lang]}: {prediction.luckyStone[lang]}
              </Text>
            </View>
          </View>
        </View>
      </ViewShot>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { padding: spacing.lg, gap: spacing.md },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: { fontSize: 22, color: '#1a1200', fontWeight: '800' },
  headerText: { flex: 1 },
  title: { color: colors.text, fontSize: fontSize.h3, fontWeight: '800' },
  subtitle: { color: colors.textDim, fontSize: fontSize.tiny, marginTop: 2 },
  bookmark: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  scoreRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  scorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(245,158,11,0.12)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  scoreText: { color: colors.goldLight, fontSize: fontSize.small, fontWeight: '700' },
  divider: { height: 1, backgroundColor: colors.borderSoft },
  paragraph: { color: colors.text, fontSize: fontSize.body, lineHeight: 24 },
  verdict: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: 'rgba(245,158,11,0.08)',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  verdictText: { color: colors.goldLight, fontSize: fontSize.small, flex: 1, lineHeight: 20, fontStyle: 'italic' },
  footer: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  chipText: { color: colors.textDim, fontSize: fontSize.tiny, fontWeight: '600' },
});
