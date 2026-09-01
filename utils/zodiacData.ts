import type { Bi } from '@/utils/i18n';

export type ZodiacSign = {
  id: number;
  symbol: string;
  name: Bi;
  dateRange: Bi;
  element: Bi;
  planet: Bi;
  trait: Bi;
  stone: Bi;
  luckyColor: Bi;
  luckyColorHex: string;
  direction: Bi;
};

export const SIGNS: ZodiacSign[] = [
  {
    id: 0,
    symbol: '♈',
    name: { en: 'Aries', hi: 'मेष' },
    dateRange: { en: '21 Mar – 19 Apr', hi: '21 मार्च – 19 अप्रैल' },
    element: { en: 'Fire', hi: 'अग्नि' },
    planet: { en: 'Mars', hi: 'मंगल' },
    trait: { en: 'Bold and pioneering', hi: 'साहसी और अग्रणी' },
    stone: { en: 'Coral', hi: 'मूंगा' },
    luckyColor: { en: 'Coral Red', hi: 'मूंगा लाल' },
    luckyColorHex: '#ef4444',
    direction: { en: 'East', hi: 'पूर्व' },
  },
  {
    id: 1,
    symbol: '♉',
    name: { en: 'Taurus', hi: 'वृषभ' },
    dateRange: { en: '20 Apr – 20 May', hi: '20 अप्रैल – 20 मई' },
    element: { en: 'Earth', hi: 'पृथ्वी' },
    planet: { en: 'Venus', hi: 'शुक्र' },
    trait: { en: 'Steady and loyal', hi: 'धैर्यवान और वफ़ादार' },
    stone: { en: 'Emerald', hi: 'पन्ना' },
    luckyColor: { en: 'Emerald Green', hi: 'हरा' },
    luckyColorHex: '#22c55e',
    direction: { en: 'South-East', hi: 'आग्नेय' },
  },
  {
    id: 2,
    symbol: '♊',
    name: { en: 'Gemini', hi: 'मिथुन' },
    dateRange: { en: '21 May – 20 Jun', hi: '21 मई – 20 जून' },
    element: { en: 'Air', hi: 'वायु' },
    planet: { en: 'Mercury', hi: 'बुध' },
    trait: { en: 'Curious and quick', hi: 'जिज्ञासु और तेज़' },
    stone: { en: 'Emerald', hi: 'पन्ना' },
    luckyColor: { en: 'Light Yellow', hi: 'हल्का पीला' },
    luckyColorHex: '#facc15',
    direction: { en: 'South', hi: 'दक्षिण' },
  },
  {
    id: 3,
    symbol: '♋',
    name: { en: 'Cancer', hi: 'कर्क' },
    dateRange: { en: '21 Jun – 22 Jul', hi: '21 जून – 22 जुलाई' },
    element: { en: 'Water', hi: 'जल' },
    planet: { en: 'Moon', hi: 'चंद्र' },
    trait: { en: 'Caring and intuitive', hi: 'संवेदनशील और सहज ज्ञानी' },
    stone: { en: 'Pearl', hi: 'मोती' },
    luckyColor: { en: 'Pearl White', hi: 'सफ़ेद' },
    luckyColorHex: '#e2e8f0',
    direction: { en: 'South-West', hi: 'नैऋत्य' },
  },
  {
    id: 4,
    symbol: '♌',
    name: { en: 'Leo', hi: 'सिंह' },
    dateRange: { en: '23 Jul – 22 Aug', hi: '23 जुलाई – 22 अगस्त' },
    element: { en: 'Fire', hi: 'अग्नि' },
    planet: { en: 'Sun', hi: 'सूर्य' },
    trait: { en: 'Radiant and generous', hi: 'प्रभावशाली और उदार' },
    stone: { en: 'Ruby', hi: 'माणिक्य' },
    luckyColor: { en: 'Saffron Gold', hi: 'केसरिया' },
    luckyColorHex: '#f97316',
    direction: { en: 'West', hi: 'पश्चिम' },
  },
  {
    id: 5,
    symbol: '♍',
    name: { en: 'Virgo', hi: 'कन्या' },
    dateRange: { en: '23 Aug – 22 Sep', hi: '23 अगस्त – 22 सितंबर' },
    element: { en: 'Earth', hi: 'पृथ्वी' },
    planet: { en: 'Mercury', hi: 'बुध' },
    trait: { en: 'Precise and helpful', hi: 'सटीक और सहायक' },
    stone: { en: 'Diamond', hi: 'हीरा' },
    luckyColor: { en: 'Deep Green', hi: 'गहरा हरा' },
    luckyColorHex: '#059669',
    direction: { en: 'North-West', hi: 'वायव्य' },
  },
  {
    id: 6,
    symbol: '♎',
    name: { en: 'Libra', hi: 'तुला' },
    dateRange: { en: '23 Sep – 22 Oct', hi: '23 सितंबर – 22 अक्टूबर' },
    element: { en: 'Air', hi: 'वायु' },
    planet: { en: 'Venus', hi: 'शुक्र' },
    trait: { en: 'Balanced and charming', hi: 'संतुलित और आकर्षक' },
    stone: { en: 'Diamond', hi: 'हीरा' },
    luckyColor: { en: 'Lavender', hi: 'लैवेंडर' },
    luckyColorHex: '#a78bfa',
    direction: { en: 'North', hi: 'उत्तर' },
  },
  {
    id: 7,
    symbol: '♏',
    name: { en: 'Scorpio', hi: 'वृश्चिक' },
    dateRange: { en: '23 Oct – 21 Nov', hi: '23 अक्टूबर – 21 नवंबर' },
    element: { en: 'Water', hi: 'जल' },
    planet: { en: 'Mars', hi: 'मंगल' },
    trait: { en: 'Intense and secretive', hi: 'गहन और रहस्यमय' },
    stone: { en: 'Coral', hi: 'मूंगा' },
    luckyColor: { en: 'Maroon', hi: 'मैरून' },
    luckyColorHex: '#b91c1c',
    direction: { en: 'North-East', hi: 'ईशान' },
  },
  {
    id: 8,
    symbol: '♐',
    name: { en: 'Sagittarius', hi: 'धनु' },
    dateRange: { en: '22 Nov – 21 Dec', hi: '22 नवंबर – 21 दिसंबर' },
    element: { en: 'Fire', hi: 'अग्नि' },
    planet: { en: 'Jupiter', hi: 'बृहस्पति' },
    trait: { en: 'Adventurous and wise', hi: 'साहसी और बुद्धिमान' },
    stone: { en: 'Yellow Sapphire', hi: 'पुखराज' },
    luckyColor: { en: 'Sunshine Yellow', hi: 'पीला' },
    luckyColorHex: '#eab308',
    direction: { en: 'East', hi: 'पूर्व' },
  },
  {
    id: 9,
    symbol: '♑',
    name: { en: 'Capricorn', hi: 'मकर' },
    dateRange: { en: '22 Dec – 19 Jan', hi: '22 दिसंबर – 19 जनवरी' },
    element: { en: 'Earth', hi: 'पृथ्वी' },
    planet: { en: 'Saturn', hi: 'शनि' },
    trait: { en: 'Disciplined and patient', hi: 'अनुशासित और धैर्यवान' },
    stone: { en: 'Blue Sapphire', hi: 'नीलम' },
    luckyColor: { en: 'Indigo', hi: 'नीला' },
    luckyColorHex: '#2563eb',
    direction: { en: 'South', hi: 'दक्षिण' },
  },
  {
    id: 10,
    symbol: '♒',
    name: { en: 'Aquarius', hi: 'कुंभ' },
    dateRange: { en: '20 Jan – 18 Feb', hi: '20 जनवरी – 18 फ़रवरी' },
    element: { en: 'Air', hi: 'वायु' },
    planet: { en: 'Saturn', hi: 'शनि' },
    trait: { en: 'Original and humane', hi: 'मौलिक और मानवतावादी' },
    stone: { en: 'Gomed', hi: 'गोमेद' },
    luckyColor: { en: 'Electric Blue', hi: 'आसमानी' },
    luckyColorHex: '#38bdf8',
    direction: { en: 'West', hi: 'पश्चिम' },
  },
  {
    id: 11,
    symbol: '♓',
    name: { en: 'Pisces', hi: 'मीन' },
    dateRange: { en: '19 Feb – 20 Mar', hi: '19 फ़रवरी – 20 मार्च' },
    element: { en: 'Water', hi: 'जल' },
    planet: { en: 'Jupiter', hi: 'बृहस्पति' },
    trait: { en: 'Gentle and imaginative', hi: 'कोमल और कल्पनाशील' },
    stone: { en: 'Yellow Sapphire', hi: 'पुखराज' },
    luckyColor: { en: 'Sea Green', hi: 'समुद्री हरा' },
    luckyColorHex: '#14b8a6',
    direction: { en: 'North-East', hi: 'ईशान' },
  },
];

export const getSign = (id: number): ZodiacSign => SIGNS[((id % 12) + 12) % 12];

/** Tropical window used by most Indian rashifal apps. */
const SIGN_WINDOWS: { startMonth: number; startDay: number; endMonth: number; endDay: number }[] = [
  { startMonth: 2, startDay: 21, endMonth: 3, endDay: 19 },
  { startMonth: 3, startDay: 20, endMonth: 4, endDay: 20 },
  { startMonth: 4, startDay: 21, endMonth: 5, endDay: 20 },
  { startMonth: 5, startDay: 21, endMonth: 6, endDay: 22 },
  { startMonth: 6, startDay: 23, endMonth: 7, endDay: 22 },
  { startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { startMonth: 9, startDay: 23, endMonth: 10, endDay: 21 },
  { startMonth: 10, startDay: 22, endMonth: 11, endDay: 21 },
  { startMonth: 11, startDay: 22, endMonth: 0, endDay: 19 },
  { startMonth: 0, startDay: 20, endMonth: 1, endDay: 18 },
  { startMonth: 1, startDay: 19, endMonth: 2, endDay: 20 },
];

/** Derives the zodiac sign index (0 = मेष) from a birth date. */
export function signFromDate(dob: Date): number {
  const m = dob.getMonth();
  const d = dob.getDate();
  for (let i = 0; i < SIGN_WINDOWS.length; i += 1) {
    const w = SIGN_WINDOWS[i];
    if (w.startMonth === w.endMonth) {
      if (m === w.startMonth && d >= w.startDay && d <= w.endDay) return i;
    } else if (w.startMonth > w.endMonth) {
      // wraps the year boundary (Capricorn)
      if ((m === w.startMonth && d >= w.startDay) || (m === w.endMonth && d <= w.endDay)) return i;
    } else if ((m === w.startMonth && d >= w.startDay) || (m === w.endMonth && d <= w.endDay) || (m > w.startMonth && m < w.endMonth)) {
      return i;
    }
  }
  return 9;
}

export const DIRECTIONS: Bi[] = [
  { en: 'East', hi: 'पूर्व' },
  { en: 'South-East', hi: 'आग्नेय' },
  { en: 'South', hi: 'दक्षिण' },
  { en: 'South-West', hi: 'नैऋत्य' },
  { en: 'West', hi: 'पश्चिम' },
  { en: 'North-West', hi: 'वायव्य' },
  { en: 'North', hi: 'उत्तर' },
  { en: 'North-East', hi: 'ईशान' },
];

export const LUCKY_COLORS: { label: Bi; hex: string }[] = [
  { label: { en: 'Coral Red', hi: 'मूंगा लाल' }, hex: '#ef4444' },
  { label: { en: 'Emerald Green', hi: 'पन्ना हरा' }, hex: '#22c55e' },
  { label: { en: 'Saffron Gold', hi: 'केसरिया' }, hex: '#f59e0b' },
  { label: { en: 'Pearl White', hi: 'मोतिया सफ़ेद' }, hex: '#e2e8f0' },
  { label: { en: 'Royal Purple', hi: 'राजसी बैंगनी' }, hex: '#8b5cf6' },
  { label: { en: 'Sky Blue', hi: 'आसमानी नीला' }, hex: '#38bdf8' },
  { label: { en: 'Rose Pink', hi: 'गुलाबी' }, hex: '#f472b6' },
  { label: { en: 'Deep Maroon', hi: 'गहरा मैरून' }, hex: '#b91c1c' },
  { label: { en: 'Turquoise', hi: 'फ़िरोज़ा' }, hex: '#14b8a6' },
  { label: { en: 'Amber Yellow', hi: 'अंबर पीला' }, hex: '#eab308' },
];

export const LUCKY_TIMES: Bi[] = [
  { en: '06:10 – 07:30 AM', hi: 'सुबह 06:10 – 07:30' },
  { en: '08:15 – 09:45 AM', hi: 'सुबह 08:15 – 09:45' },
  { en: '10:00 – 11:20 AM', hi: 'सुबह 10:00 – 11:20' },
  { en: '12:05 – 01:15 PM', hi: 'दोपहर 12:05 – 01:15' },
  { en: '02:30 – 03:45 PM', hi: 'दोपहर 02:30 – 03:45' },
  { en: '04:00 – 05:10 PM', hi: 'शाम 04:00 – 05:10' },
  { en: '06:20 – 07:35 PM', hi: 'शाम 06:20 – 07:35' },
  { en: '08:00 – 09:20 PM', hi: 'रात 08:00 – 09:20' },
  { en: '09:45 – 10:30 PM', hi: 'रात 09:45 – 10:30' },
  { en: '05:00 – 06:00 AM', hi: 'ब्रह्म मुहूर्त 05:00 – 06:00' },
];

export const MOODS: Bi[] = [
  { en: 'Calm focus', hi: 'शांत एकाग्रता' },
  { en: 'Warm & open', hi: 'गर्मजोशी भरा' },
  { en: 'Driven', hi: 'दृढ़ संकल्प' },
  { en: 'Playful', hi: 'चंचल' },
  { en: 'Reflective', hi: 'विचारशील' },
  { en: 'Protective', hi: 'रक्षात्मक' },
  { en: 'Optimistic', hi: 'आशावान' },
  { en: 'Patient', hi: 'सब्रवाला' },
];
