/** Bilingual (Hindi + English) helpers and UI strings. */
export type Lang = 'hi' | 'en';
export type Bi = { en: string; hi: string };

export const bi = (value: Bi, lang: Lang): string => value[lang];

export const pick = <T,>(list: T[], index: number): T => list[((index % list.length) + list.length) % list.length];

export const MONTHS: Bi[] = [
  { en: 'January', hi: 'जनवरी' },
  { en: 'February', hi: 'फ़रवरी' },
  { en: 'March', hi: 'मार्च' },
  { en: 'April', hi: 'अप्रैल' },
  { en: 'May', hi: 'मई' },
  { en: 'June', hi: 'जून' },
  { en: 'July', hi: 'जुलाई' },
  { en: 'August', hi: 'अगस्त' },
  { en: 'September', hi: 'सितंबर' },
  { en: 'October', hi: 'अक्टूबर' },
  { en: 'November', hi: 'नवंबर' },
  { en: 'December', hi: 'दिसंबर' },
];

export const WEEKDAYS: Bi[] = [
  { en: 'Sunday', hi: 'रविवार' },
  { en: 'Monday', hi: 'सोमवार' },
  { en: 'Tuesday', hi: 'मंगलवार' },
  { en: 'Wednesday', hi: 'बुधवार' },
  { en: 'Thursday', hi: 'गुरुवार' },
  { en: 'Friday', hi: 'शुक्रवार' },
  { en: 'Saturday', hi: 'शनिवार' },
];

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

/** e.g. "Tuesday, 12 March 2025" / "मंगलवार, 12 मार्च 2025" */
export const formatLongDate = (d: Date, lang: Lang): string => {
  const wd = WEEKDAYS[d.getDay()][lang];
  const day = d.getDate();
  const month = MONTHS[d.getMonth()][lang];
  return `${wd}, ${day} ${month} ${d.getFullYear()}`;
};

export const formatShortDate = (d: Date, lang: Lang): string =>
  lang === 'hi' ? `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}` : `${pad(d.getDate())} ${MONTHS[d.getMonth()].en.slice(0, 3)} ${d.getFullYear()}`;

const padTime = (n: number) => (n < 10 ? `0${n}` : `${n}`);

/** Bilingual clock label: en -> "06:20 AM", hi -> "सुबह 06:20" */
export const formatClock = (d: Date, lang: Lang): string => {
  const h = d.getHours();
  const m = d.getMinutes();
  const time = `${padTime(h % 12 === 0 ? 12 : h % 12)}:${padTime(m)}`;
  if (lang === 'en') {
    const suffix = h < 12 ? 'AM' : 'PM';
    return `${time} ${suffix}`;
  }
  if (h < 5) return `रात ${time}`;
  if (h < 12) return `सुबह ${time}`;
  if (h < 17) return `दोपहर ${time}`;
  if (h < 20) return `शाम ${time}`;
  return `रात ${time}`;
};

export const UI = {
  appName: { en: 'Daily Rashifal', hi: 'दैनिक राशिफल' },
  tagline: { en: 'Your stars, decoded every day', hi: 'हर दिन, आपके सितारों का हल' },
  welcomeTitle: { en: 'Namaste, star traveller', hi: 'नमस्ते, तारों के यात्री' },
  welcomeBody: {
    en: 'Daily horoscope, panchang and kundli matching — crafted in Hindi and English, for you.',
    hi: 'दैनिक राशिफल, पंचांग और कुंडली मिलान — हिंदी और अंग्रेज़ी में, सिर्फ़ आपके लिए।',
  },
  getStarted: { en: 'Get Started', hi: 'शुरू करें' },
  continueLabel: { en: 'Continue', hi: 'आगे बढ़ें' },
  next: { en: 'Next', hi: 'अगला' },
  back: { en: 'Back', hi: 'वापस' },
  yourName: { en: 'Your name', hi: 'आपका नाम' },
  namePlaceholder: { en: 'Enter your name', hi: 'अपना नाम लिखें' },
  birthDate: { en: 'Date of birth', hi: 'जन्म तिथि' },
  day: { en: 'Day', hi: 'दिन' },
  month: { en: 'Month', hi: 'माह' },
  year: { en: 'Year', hi: 'वर्ष' },
  chooseSign: { en: 'Choose your zodiac sign', hi: 'अपनी राशि चुनें' },
  suggested: { en: 'Suggested', hi: 'सुझाव' },
  yourSign: { en: 'Your sign', hi: 'आपकी राशि' },
  moonSign: { en: 'Moon sign', hi: 'चंद्र राशि' },
  finish: { en: 'Open my rashifal', hi: 'मेरा राशिफल देखें' },
  today: { en: 'Today', hi: 'आज' },
  daily: { en: 'Daily', hi: 'दैनिक' },
  weekly: { en: 'Weekly', hi: 'साप्ताहिक' },
  monthly: { en: 'Monthly', hi: 'मासिक' },
  overall: { en: 'Overall', hi: 'समग्र' },
  love: { en: 'Love', hi: 'प्रेम' },
  career: { en: 'Career', hi: 'करियर' },
  health: { en: 'Health', hi: 'स्वास्थ्य' },
  money: { en: 'Money', hi: 'धन' },
  fortune: { en: 'Fortune score', hi: 'भाग्य अंक' },
  mood: { en: 'Mood', hi: 'मनोदशा' },
  luckyColor: { en: 'Lucky colour', hi: 'शुभ रंग' },
  luckyNumber: { en: 'Lucky number', hi: 'शुभ अंक' },
  luckyTime: { en: 'Lucky time', hi: 'शुभ समय' },
  luckyDirection: { en: 'Lucky direction', hi: 'शुभ दिशा' },
  luckyStone: { en: 'Ratna', hi: 'रत्न' },
  panchang: { en: 'Panchang', hi: 'पंचांग' },
  tithi: { en: 'Tithi', hi: 'तिथि' },
  nakshatra: { en: 'Nakshatra', hi: 'नक्षत्र' },
  yoga: { en: 'Yoga', hi: 'योग' },
  karana: { en: 'Karana', hi: 'करण' },
  rahuKaal: { en: 'Rahu Kaal', hi: 'राहु काल' },
  sunrise: { en: 'Sunrise', hi: 'सूर्योदय' },
  sunset: { en: 'Sunset', hi: 'सूर्यास्त' },
  streak: { en: 'Day streak', hi: 'दिन की स्ट्रीक' },
  saved: { en: 'Saved rashifals', hi: 'सहेजे गए राशिफल' },
  noSaved: { en: 'No saved rashifals yet. Tap the bookmark on any prediction.', hi: 'अभी कोई राशिफल सहेजा नहीं गया। किसी भी भविष्यवाणी पर बुकमार्क दबाएँ।' },
  premium: { en: 'Premium', hi: 'प्रीमियम' },
  goPremium: { en: 'Go Premium', hi: 'प्रीमियम लें' },
  premiumTitle: { en: 'Unlock the full cosmos', hi: 'पूरा ब्रह्मांड खोलें' },
  premiumBody: {
    en: 'Weekly & monthly rashifal, kundli matching, yearly horoscope and unlimited bookmarks.',
    hi: 'साप्ताहिक व मासिक राशिफल, कुंडली मिलान, वार्षिक राशिफल और असीमित बुकमार्क।',
  },
  upgrade: { en: 'Upgrade now', hi: 'अभी अपग्रेड करें' },
  restore: { en: 'Restore purchases', hi: 'खरीद बहाल करें' },
  restoreSuccess: { en: 'Premium restored. Welcome back!', hi: 'प्रीमियम बहाल हो गया। स्वागत है!' },
  restoreFail: { en: 'No previous purchase found for this account.', hi: 'इस खाते की कोई पिछली खरीद नहीं मिली।' },
  settings: { en: 'Settings', hi: 'सेटिंग्स' },
  language: { en: 'Language', hi: 'भाषा' },
  notifications: { en: 'Daily reminder', hi: 'दैनिक सूचना' },
  reminderTime: { en: 'Reminder time', hi: 'सूचना का समय' },
  privacyPolicy: { en: 'Privacy Policy', hi: 'गोपनीयता नीति' },
  about: { en: 'About', hi: 'परिचय' },
  share: { en: 'Share', hi: 'साझा करें' },
  shareAsText: { en: 'Share as text', hi: 'टेक्स्ट के रूप में साझा करें' },
  shareAsImage: { en: 'Download as image', hi: 'चित्र के रूप में सहेजें' },
  cancel: { en: 'Cancel', hi: 'रद्द करें' },
  kundli: { en: 'Kundli Matching', hi: 'कुंडली मिलान' },
  kundliSubtitle: { en: 'Check zodiac compatibility in seconds', hi: 'सेकंडों में राशि मेलान जाँचें' },
  selectSigns: { en: 'Select two signs', hi: 'दो राशियाँ चुनें' },
  match: { en: 'Match now', hi: 'अभी मिलान करें' },
  compatibility: { en: 'Compatibility', hi: 'अनुकूलता' },
  trust: { en: 'Trust', hi: 'विश्वास' },
  communication: { en: 'Communication', hi: 'संवाद' },
  summary: { en: 'Astrologer note', hi: 'ज्योतिष टिप्पणी' },
  shareResult: { en: 'Share result', hi: 'परिणाम साझा करें' },
  yearly: { en: 'Yearly Horoscope', hi: 'वार्षिक राशिफल' },
  yearlySubtitle: { en: 'Month by month predictions for the year ahead', hi: 'आने वाले साल का महीने-दर-महीने फल' },
  lockedTitle: { en: 'This reading is Premium', hi: 'यह भविष्यवाणी प्रीमियम है' },
  lockedBody: { en: 'Upgrade to read unlimited weekly, monthly, kundli and yearly predictions.', hi: 'असीमित साप्ताहिक, मासिक, कुंडली और वार्षिक भविष्यवाणी पढ़ने के लिए अपग्रेड करें।' },
  bestValue: { en: 'BEST VALUE', hi: 'सर्वोत्तम' },
  perMonth: { en: '/month', hi: '/माह' },
  perYear: { en: '/year', hi: '/वर्ष' },
  lifetimeNote: { en: 'one-time', hi: 'एक बार' },
  choosePlan: { en: 'Continue', hi: 'जारी रखें' },
  purchaseSuccess: { en: 'Premium activated! Stars are aligned.', hi: 'प्रीमियम सक्रिय! सितारे आपके साथ हैं।' },
  close: { en: 'Close', hi: 'बंद करें' },
  bookmarkMax: { en: 'Free plan allows 50 bookmarks. Upgrade for unlimited.', hi: 'फ्री प्लान में 50 बुकमार्क मिलते हैं। असीमित के लिए अपग्रेड करें।' },
  bookmarkAdded: { en: 'Saved to your bookmarks', hi: 'बुकमार्क में सहेजा गया' },
  reset: { en: 'Reset app data', hi: 'ऐप डेटा रीसेट करें' },
  resetConfirmTitle: { en: 'Reset everything?', hi: 'सब कुछ रीसेट करें?' },
  resetConfirmBody: { en: 'Your profile, streak and bookmarks will be deleted from this device.', hi: 'आपकी प्रोफ़ाइल, स्ट्रीक और बुकमार्क इस डिवाइस से हट जाएँगे।' },
  rate: { en: 'Rate this app', hi: 'इस ऐप को रेट करें' },
  poweredBy: { en: 'Made with ✦ for the stars', hi: '✦ सितारों के लिए बनाया गया' },
  demoPremium: { en: 'Premium preview (demo)', hi: 'प्रीमियम पूर्वावलोकन (डेमो)' },
  choose: { en: 'Choose', hi: 'चुनें' },
  hello: { en: 'Hello', hi: 'नमस्ते' },
  predictions: { en: 'predictions', hi: 'भविष्यवाणियाँ' },
  savedMaxTitle: { en: 'Bookmark limit reached', hi: 'बुकमार्क सीमा पूरी' },
  ok: { en: 'OK', hi: 'ठीक है' },
  notifBlocked: { en: 'Notification permission was not granted.', hi: 'सूचना की अनुमति नहीं मिली।' },
  notifScheduled: { en: 'Daily reminder set', hi: 'दैनिक सूचना सेट हो गई' },
  imageShared: { en: 'Rashifal image ready to share', hi: 'राशिफल चित्र साझा करने के लिए तैयार' },
  sign: { en: 'Sign', hi: 'राशि' },
  element: { en: 'Element', hi: 'तत्व' },
  planet: { en: 'Ruling planet', hi: 'स्वामी ग्रह' },
  a: { en: 'Partner A', hi: 'पक्ष क' },
  b: { en: 'Partner B', hi: 'पक्ष ख' },
} as const satisfies Record<string, Bi>;

export type UIKey = keyof typeof UI;
