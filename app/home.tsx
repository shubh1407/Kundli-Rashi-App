import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ViewShot, { captureRef, type ViewShotRef } from 'react-native-view-shot';
import CategoryTabs from '@/components/CategoryTabs';
import GoPremiumCard from '@/components/GoPremiumCard';
import LuckyElementsCard from '@/components/LuckyElementsCard';
import PanchangRow from '@/components/PanchangRow';
import PeriodTabs from '@/components/PeriodTabs';
import PredictionCard from '@/components/PredictionCard';
import PremiumGate from '@/components/PremiumGate';
import ScreenBackground from '@/components/ScreenBackground';
import ShareBottomSheet from '@/components/ShareBottomSheet';
import StarRating from '@/components/StarRating';
import StreakCounter from '@/components/StreakCounter';
import { colors, fontSize, glass, radius, shadow, spacing } from '@/constants/theme';
import { usePremium } from '@/hooks/usePremium';
import { useStore } from '@/store/useStore';
import { buildShareText, getPrediction } from '@/utils/contentEngine';
import { UI, formatClock, formatLongDate } from '@/utils/i18n';
import { getPanchang } from '@/utils/panchangData';
import { type Category, type Period } from '@/utils/predictionTemplates';
import { SIGNS, getSign } from '@/utils/zodiacData';

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const lang = useStore((s) => s.language);
  const profile = useStore((s) => s.profile);
  const favorites = useStore((s) => s.favorites);
  const removeFavorite = useStore((s) => s.removeFavorite);
  const touchStreak = useStore((s) => s.touchStreak);
  const streak = useStore((s) => s.streak);
  const { isPremium } = usePremium();

  const [category, setCategory] = useState<Category>('overall');
  const [period, setPeriod] = useState<Period>('daily');
  const [selectedSign, setSelectedSign] = useState(profile?.signId ?? 0);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [lockedPreview, setLockedPreview] = useState<Period | null>(null);

  const shotRef = useRef<ViewShotRef>(null);
  const today = useMemo(() => new Date(), []);

  const panchang = useMemo(() => getPanchang(today), [today]);

  const prediction = useMemo(
    () => getPrediction(selectedSign, category, period, today),
    [selectedSign, category, period, today, refreshKey],
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshKey((k) => k + 1);
      setRefreshing(false);
    }, 650);
  }, []);

  const onChangePeriod = useCallback(
    (next: Period) => {
      if (next !== 'daily' && !isPremium) {
        setLockedPreview(next);
        return;
      }
      setPeriod(next);
    },
    [isPremium],
  );

  const shareText = useCallback(async () => {
    const text = buildShareText(prediction, lang, profile?.name);
    try {
      if (Platform.OS === 'web') {
        const nav = navigator as Navigator & { clipboard?: { writeText: (value: string) => Promise<void> } };
        if (nav.clipboard) {
          await nav.clipboard.writeText(text);
          Alert.alert(UI.share[lang], lang === 'hi' ? 'राशिफल कॉपी हो गया।' : 'Rashifal copied to clipboard.');
        } else {
          Alert.alert(UI.share[lang], text);
        }
        return;
      }
      await Share.share({ message: text, title: UI.appName[lang] });
    } catch {
      // user dismissed the share sheet
    }
  }, [lang, prediction, profile]);

  const shareImage = useCallback(async () => {
    try {
      const uri = await captureRef(shotRef, { format: 'png', quality: 1 });
      if (Platform.OS === 'web') {
        Alert.alert(UI.shareAsImage[lang], UI.imageShared[lang]);
        return;
      }
      await Share.share({ url: uri, message: buildShareText(prediction, lang, profile?.name), title: UI.appName[lang] });
    } catch {
      Alert.alert(UI.share[lang], lang === 'hi' ? 'चित्र नहीं बन सका, टेक्स्ट साझा करें।' : 'Could not render the image — try sharing as text.');
    }
  }, [lang, prediction, profile]);

  const sign = getSign(selectedSign);

  return (
    <ScreenBackground seed={`home-${selectedSign}-${category}`}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 110 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.gold} colors={[colors.gold]} />}
      >
        <View style={styles.header}>
          <View style={styles.flex}>
            <Text style={styles.greeting}>
              {UI.hello[lang]}, {profile?.name ?? '✦'}
            </Text>
            <Text style={styles.date}>{formatLongDate(today, lang)}</Text>
          </View>
          {isPremium ? (
            <View style={styles.premiumBadge}>
              <Ionicons name="diamond" size={11} color="#1a1200" />
              <Text style={styles.premiumBadgeText}>{UI.premium[lang]}</Text>
            </View>
          ) : null}
          <Pressable style={styles.iconBtn} onPress={() => router.push('/settings')} accessibilityRole="button" accessibilityLabel={UI.settings[lang]}>
            <Ionicons name="settings-outline" size={20} color={colors.text} />
          </Pressable>
        </View>

        <View style={styles.sectionGap}>
          <StreakCounter count={streak.count} best={streak.best} />
        </View>

        <FlatList
          horizontal
          data={SIGNS}
          keyExtractor={(item) => `sign-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.signRow}
          renderItem={({ item }) => {
            const active = item.id === selectedSign;
            return (
              <Pressable onPress={() => setSelectedSign(item.id)} style={[styles.signChip, active && styles.signChipOn]} accessibilityRole="button">
                <Text style={[styles.signSymbol, active && styles.textDark]}>{item.symbol}</Text>
                <Text style={[styles.signName, active && styles.textDark]}>{item.name[lang]}</Text>
              </Pressable>
            );
          }}
        />

        <View style={styles.periodWrap}>
          <PeriodTabs value={period} onChange={onChangePeriod} isLocked={(p) => p !== 'daily' && !isPremium} />
        </View>

        <CategoryTabs value={category} onChange={setCategory} />

        <View style={styles.sectionGap}>
          <PredictionCard key={`${prediction.id}-${refreshKey}`} prediction={prediction} shotRef={shotRef} />
        </View>

        <View style={styles.sectionGap}>
          <LuckyElementsCard prediction={prediction} />
        </View>

        <Animated.View entering={FadeInDown.delay(140).duration(420)} style={[glass, styles.panchangCard, shadow(6)]}>
          <View style={styles.cardHeadingRow}>
            <Ionicons name="calendar-outline" size={16} color={colors.gold} />
            <Text style={styles.cardHeading}>{UI.panchang[lang]}</Text>
            <Text style={styles.cardHeadingSub}>{sign.symbol} {sign.name[lang]}</Text>
          </View>
          <PanchangRow icon="moon-outline" label={UI.tithi[lang]} value={`${panchang.paksha[lang]} ${panchang.tithi[lang]}`} />
          <PanchangRow icon="star-outline" label={UI.nakshatra[lang]} value={panchang.nakshatra[lang]} sub={`Pada ${panchang.pada}`} />
          <PanchangRow icon="flower-outline" label={UI.yoga[lang]} value={panchang.yoga[lang]} />
          <PanchangRow icon="contrast-outline" label={UI.karana[lang]} value={panchang.karana[lang]} />
          <PanchangRow
            icon="alert-circle-outline"
            label={UI.rahuKaal[lang]}
            value={`${formatClock(panchang.rahuKaal.start, lang)} – ${formatClock(panchang.rahuKaal.end, lang)}`}
            sub={lang === 'hi' ? 'अशुभ समय' : 'Inauspicious window'}
          />
          <PanchangRow icon="sunny-outline" label={UI.sunrise[lang]} value={formatClock(panchang.sunrise, lang)} />
          <PanchangRow icon="partly-sunny-outline" label={UI.sunset[lang]} value={formatClock(panchang.sunset, lang)} />
          <PanchangRow
            icon="moon"
            label={UI.moonSign[lang]}
            value={`${getSign(panchang.moonSign).symbol} ${getSign(panchang.moonSign).name[lang]}`}
          />
        </Animated.View>

        <View style={styles.linkRow}>
          <Pressable style={[glass, styles.linkCard, shadow(5)]} onPress={() => router.push('/kundli')} accessibilityRole="button">
            <Ionicons name="heart-circle-outline" size={22} color={colors.gold} />
            <Text style={styles.linkTitle}>{UI.kundli[lang]}</Text>
            <Text style={styles.linkSub}>{UI.kundliSubtitle[lang]}</Text>
          </Pressable>
          <Pressable style={[glass, styles.linkCard, shadow(5)]} onPress={() => router.push('/yearly')} accessibilityRole="button">
            <Ionicons name="calendar-clear-outline" size={22} color={colors.gold} />
            <Text style={styles.linkTitle}>{UI.yearly[lang]}</Text>
            <Text style={styles.linkSub}>{UI.yearlySubtitle[lang]}</Text>
          </Pressable>
        </View>

        {!isPremium ? <GoPremiumCard onPress={() => router.push('/paywall')} /> : null}

        <View style={styles.sectionGap}>
          <Text style={styles.sectionTitle}>{UI.saved[lang]} · {favorites.length}</Text>
          {favorites.length === 0 ? (
            <Text style={styles.empty}>{UI.noSaved[lang]}</Text>
          ) : (
            <FlatList
              horizontal
              data={favorites}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.favRow}
              renderItem={({ item }) => (
                <Pressable
                  style={[glass, styles.favCard, shadow(4)]}
                  onPress={() => {
                    setSelectedSign(item.signId);
                    setCategory(item.category);
                    setPeriod(item.period === 'daily' || isPremium ? item.period : 'daily');
                  }}
                >
                  <Text style={styles.favSymbol}>{getSign(item.signId).symbol}</Text>
                  <Text style={styles.favTitle} numberOfLines={1}>
                    {item.title[lang]}
                  </Text>
                  <View style={styles.favMetaRow}>
                    <StarRating rating={item.stars} size={10} />
                    <Text style={styles.favDate}>{item.dateKey}</Text>
                  </View>
                  <Pressable onPress={() => removeFavorite(item.id)} hitSlop={8} style={styles.favRemove} accessibilityRole="button">
                    <Ionicons name="close" size={12} color={colors.textFaint} />
                  </Pressable>
                </Pressable>
              )}
            />
          )}
        </View>

        <Text style={styles.footer}>{UI.poweredBy[lang]}</Text>
      </ScrollView>

      <Pressable
        style={[styles.fab, shadow(12), { bottom: insets.bottom + spacing.xl }]}
        onPress={() => setSheetVisible(true)}
        accessibilityRole="button"
        accessibilityLabel={UI.share[lang]}
      >
        <Ionicons name="share-social" size={22} color="#1a1200" />
      </Pressable>

      <ShareBottomSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        onShareText={() => {
          setSheetVisible(false);
          shareText();
        }}
        onShareImage={() => {
          setSheetVisible(false);
          shareImage();
        }}
      />

      <Modal visible={lockedPreview !== null} transparent animationType="fade" onRequestClose={() => setLockedPreview(null)} statusBarTranslucent>
        <View style={styles.modalBackdrop}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <PremiumGate locked onUpgrade={() => { setLockedPreview(null); router.push('/paywall'); }}>
              <View style={styles.modalCard}>
                <Text style={styles.modalHeading}>
                  {sign.symbol} {sign.name[lang]} · {lockedPreview === 'weekly' ? UI.weekly[lang] : UI.monthly[lang]}
                </Text>
                <PredictionCard prediction={getPrediction(selectedSign, category, lockedPreview ?? 'weekly', today)} />
              </View>
            </PremiumGate>
            <Pressable onPress={() => setLockedPreview(null)} style={styles.modalClose} accessibilityRole="button">
              <Text style={styles.modalCloseText}>{UI.close[lang]}</Text>
            </Pressable>
          </ScrollView>
        </View>
      </Modal>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, gap: spacing.md },
  flex: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  greeting: { color: colors.text, fontSize: fontSize.h1, fontWeight: '900' },
  date: { color: colors.textDim, fontSize: fontSize.small, marginTop: 2 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.gold,
  },
  premiumBadgeText: { color: '#1a1200', fontSize: fontSize.tiny, fontWeight: '900' },
  sectionGap: { marginTop: spacing.xs },
  signRow: { gap: spacing.sm, paddingVertical: spacing.xs },
  signChip: {
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    minWidth: 72,
  },
  signChipOn: { backgroundColor: colors.gold, borderColor: colors.goldLight },
  signSymbol: { fontSize: 18, color: colors.gold, fontWeight: '800' },
  signName: { fontSize: fontSize.tiny, color: colors.textDim, fontWeight: '700' },
  textDark: { color: '#1a1200' },
  periodWrap: { marginTop: spacing.xs },
  panchangCard: { padding: spacing.lg },
  cardHeadingRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  cardHeading: { color: colors.text, fontSize: fontSize.h3, fontWeight: '800', flex: 1 },
  cardHeadingSub: { color: colors.textDim, fontSize: fontSize.tiny, fontWeight: '600' },
  linkRow: { flexDirection: 'row', gap: spacing.md },
  linkCard: { flex: 1, padding: spacing.lg, gap: 6 },
  linkTitle: { color: colors.text, fontSize: fontSize.body, fontWeight: '800' },
  linkSub: { color: colors.textFaint, fontSize: fontSize.tiny, lineHeight: 16 },
  sectionTitle: { color: colors.text, fontSize: fontSize.h3, fontWeight: '800', marginBottom: spacing.sm },
  empty: { color: colors.textFaint, fontSize: fontSize.small, lineHeight: 20 },
  favRow: { gap: spacing.sm, paddingVertical: spacing.xs },
  favCard: { width: 168, padding: spacing.md, gap: 4 },
  favSymbol: { fontSize: 20, color: colors.gold, fontWeight: '800' },
  favTitle: { color: colors.text, fontSize: fontSize.small, fontWeight: '700' },
  favMetaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  favDate: { color: colors.textFaint, fontSize: fontSize.tiny },
  favRemove: { position: 'absolute', top: 8, right: 8 },
  footer: { color: colors.textFaint, fontSize: fontSize.tiny, textAlign: 'center', marginTop: spacing.lg },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gold,
  },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(4,4,14,0.85)', padding: spacing.lg, justifyContent: 'center' },
  modalContent: { paddingVertical: spacing.xl },
  modalCard: { gap: spacing.md },
  modalHeading: { color: colors.text, fontSize: fontSize.h3, fontWeight: '800', textAlign: 'center' },
  modalClose: { alignSelf: 'center', marginTop: spacing.lg, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: radius.pill, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSoft },
  modalCloseText: { color: colors.textDim, fontWeight: '700', fontSize: fontSize.small },
});
