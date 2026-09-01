import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenBackground from '@/components/ScreenBackground';
import ScreenHeader from '@/components/ScreenHeader';
import { colors, fontSize, glass, shadow, spacing } from '@/constants/theme';
import { useStore } from '@/store/useStore';
import { UI } from '@/utils/i18n';

const SECTIONS: { title: { en: string; hi: string }; body: { en: string; hi: string } }[] = [
  {
    title: { en: '1. Data we store', hi: '1. हम क्या डेटा रखते हैं' },
    body: {
      en: 'Daily Rashifal stores your name, date of birth, chosen zodiac sign, language preference, bookmarks and streak counter locally on your device using AsyncStorage. No account is created and no personal data is uploaded to any server.',
      hi: 'दैनिक राशिफल आपका नाम, जन्म तिथि, चुनी हुई राशि, भाषा, बुकमार्क और स्ट्रीक केवल आपके डिवाइस पर AsyncStorage में सुरक्षित रखता है। कोई खाता नहीं बनता और कोई व्यक्तिगत डेटा सर्वर पर नहीं जाता।',
    },
  },
  {
    title: { en: '2. Predictions & panchang', hi: '2. राशिफल और पंचांग' },
    body: {
      en: 'Horoscope text, compatibility scores and panchang values are generated on your device by a deterministic algorithm (seeded PRNG) and standard astronomical approximations. They are for entertainment and guidance, not professional advice.',
      hi: 'राशिफल, अनुकूलता अंक और पंचांग मान आपके डिवाइस पर ही निर्धारित एल्गोरिदम (सीडेड PRNG) और मानक खगोलीय सूत्रों से बनते हैं। इन्हें मनोरंजन और मार्गदर्शन के लिए देखें, पेशेवर सलाह नहीं।',
    },
  },
  {
    title: { en: '3. Notifications', hi: '3. सूचनाएँ' },
    body: {
      en: 'If you enable the daily reminder, the app asks for notification permission and schedules one local notification at your chosen time. You can turn it off any time in Settings. Nothing is sent over the internet.',
      hi: 'यदि आप दैनिक सूचना चालू करते हैं तो ऐप अनुमति माँगकर आपके चुने समय पर एक स्थानीय सूचना तय करता है। आप इसे सेटिंग्स में कभी भी बंद कर सकते हैं। कुछ भी इंटरनेट पर नहीं भेजा जाता।',
    },
  },
  {
    title: { en: '4. Premium purchases', hi: '4. प्रीमियम खरीद' },
    body: {
      en: 'This build ships with a simulated premium flow for demonstration. No real payment is processed and no billing credentials are collected. In a production release, purchases would be handled by the official app store billing system.',
      hi: 'यह बिल्ड प्रदर्शन के लिए एक सिम्युलेटेड प्रीमियम प्रोसेस के साथ आता है। कोई वास्तविक भुगतान नहीं होता और कोई बिलिंग जानकारी नहीं ली जाती। वास्तविक रिलीज़ में खरीद आधिकारिक स्टोर बिलिंग से होगी।',
    },
  },
  {
    title: { en: '5. Third parties', hi: '5. तृतीय पक्ष' },
    body: {
      en: 'The app contains no advertising SDKs, no analytics trackers and no external trackers. Sharing uses your device’s own share sheet only when you tap the share button.',
      hi: 'ऐप में कोई विज्ञापन SDK, कोई एनालिटिक्स या बाहरी ट्रैकर नहीं है। साझा करने पर ही डिवाइस की अपनी शेयर शीट खुलती है।',
    },
  },
  {
    title: { en: '6. Children', hi: '6. बच्चे' },
    body: {
      en: 'The app is suitable for a general audience and does not knowingly collect information from children under 13.',
      hi: 'यह ऐप सामान्य दर्शकों के लिए है और जानबूझकर 13 वर्ष से कम आयु के बच्चों की जानकारी नहीं लेता।',
    },
  },
  {
    title: { en: '7. Your control', hi: '7. आपका नियंत्रण' },
    body: {
      en: 'You can reset every stored item from Settings → Reset app data, which deletes the profile, streak and bookmarks from this device immediately.',
      hi: 'सेटिंग्स → ऐप डेटा रीसेट से आप हर सहेजा गया आइटम हटा सकते हैं; प्रोफ़ाइल, स्ट्रीक और बुकमार्क तुरंत डिवाइस से मिट जाते हैं।',
    },
  },
  {
    title: { en: '8. Contact', hi: '8. संपर्क' },
    body: {
      en: 'Questions about this policy can be sent to support@dailyrashifal.app. We may update this policy and will note the revision date inside the app.',
      hi: 'इस नीति के बारे में प्रश्न support@dailyrashifal.app पर भेजें। नीति बदलने पर उसकी तारीख़ ऐप में दर्ज की जाएगी।',
    },
  },
];

export default function PrivacyPolicy() {
  const lang = useStore((s) => s.language);

  return (
    <ScreenBackground seed="privacy">
      <ScreenHeader title={UI.privacyPolicy[lang]} subtitle="Last updated: 2025" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {SECTIONS.map((section, index) => (
          <Animated.View key={`section-${index}`} entering={FadeInDown.delay(index * 45).duration(380)} style={[glass, styles.card, shadow(5)]}>
            <Text style={styles.title}>{section.title[lang]}</Text>
            <Text style={styles.body}>{section.body[lang]}</Text>
          </Animated.View>
        ))}
        <View style={styles.note}>
          <Text style={styles.noteText}>
            {lang === 'hi'
              ? 'ज्योतिष परामर्श मनोरंजन और आत्म-चिंतन के लिए है। स्वास्थ्य, क़ानून या वित्त संबंधी निर्णयों के लिए पेशेवर सलाह लें।'
              : 'Astrological readings are for reflection and entertainment. For health, legal or financial decisions, consult a qualified professional.'}
          </Text>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl * 2, gap: spacing.md },
  card: { padding: spacing.lg, gap: spacing.sm },
  title: { color: colors.goldLight, fontSize: fontSize.h3, fontWeight: '800' },
  body: { color: colors.textDim, fontSize: fontSize.small, lineHeight: 22 },
  note: { padding: spacing.lg, borderRadius: 20, borderWidth: 1, borderColor: colors.border, backgroundColor: 'rgba(245,158,11,0.07)' },
  noteText: { color: colors.goldLight, fontSize: fontSize.small, lineHeight: 20, textAlign: 'center' },
});
