import type { Bi } from '@/utils/i18n';

/**
 * Lightweight Vedic panchang engine.
 * Longitudes are computed with truncated lunar theory and converted to sidereal
 * space using an approximate Lahiri ayanamsa — accurate enough for a daily rashifal app.
 */

const RAD = Math.PI / 180;

const mod360 = (x: number): number => ((x % 360) + 360) % 360;
const toJD = (d: Date): number => d.getTime() / 86400000 + 2440587.5;
const fromJD = (jd: number): Date => new Date((jd - 2440587.5) * 86400000);

/** Approximate Lahiri ayanamsa (deg) for a given Julian date. */
const ayanamsa = (jd: number): number => {
  const years = (jd - 2451545.0) / 365.25;
  return 23.85 + years * 0.0139;
};

/** Apparent ecliptic longitude of the Sun (deg). */
export function sunLongitude(jd: number): number {
  const n = jd - 2451545.0;
  const L = 280.46 + 0.9856474 * n;
  const g = mod360(357.528 + 0.9856003 * n) * RAD;
  return mod360(L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g));
}

/** Mean-led lunar longitude with the dominant periodic terms (deg). */
export function moonLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const Lp = 218.316 + 481267.8813 * T;
  const M = mod360(134.963 + 477198.8676 * T) * RAD; // moon anomaly
  const D = mod360(297.85 + 445267.1115 * T) * RAD; // mean elongation
  const Ms = mod360(357.529 + 35999.0503 * T) * RAD; // sun anomaly
  const f = mod360(93.272 + 483202.0175 * T) * RAD; // argument of latitude

  const lon =
    Lp +
    6.289 * Math.sin(M) +
    1.274 * Math.sin(2 * D - M) +
    0.658 * Math.sin(2 * D) +
    0.214 * Math.sin(2 * M) -
    0.186 * Math.sin(Ms) -
    0.114 * Math.sin(2 * D - Ms) +
    0.059 * Math.sin(2 * D - 2 * M) +
    0.057 * Math.sin(2 * D - Ms - M) +
    0.053 * Math.sin(2 * D + M) +
    0.046 * Math.sin(2 * D - Ms) +
    0.041 * Math.sin(M - Ms) -
    0.035 * Math.sin(D) -
    0.031 * Math.sin(M + Ms) +
    0.028 * Math.sin(2 * D - 2 * Ms) +
    0.02 * Math.sin(2 * f) +
    0.019 * Math.sin(M - Ms + D);

  return mod360(lon);
}

export const siderealSun = (jd: number): number => mod360(sunLongitude(jd) - ayanamsa(jd));
export const siderealMoon = (jd: number): number => mod360(moonLongitude(jd) - ayanamsa(jd));

export const TITHIS: Bi[] = [
  { en: 'Pratipada', hi: 'प्रतिपदा' },
  { en: 'Dwitiya', hi: 'द्वितीया' },
  { en: 'Tritiya', hi: 'तृतीया' },
  { en: 'Chaturthi', hi: 'चतुर्थी' },
  { en: 'Panchami', hi: 'पंचमी' },
  { en: 'Shashthi', hi: 'षष्ठी' },
  { en: 'Saptami', hi: 'सप्तमी' },
  { en: 'Ashtami', hi: 'अष्टमी' },
  { en: 'Navami', hi: 'नवमी' },
  { en: 'Dashami', hi: 'दशमी' },
  { en: 'Ekadashi', hi: 'एकादशी' },
  { en: 'Dwadashi', hi: 'द्वादशी' },
  { en: 'Trayodashi', hi: 'त्रयोदशी' },
  { en: 'Chaturdashi', hi: 'चतुर्दशी' },
  { en: 'Purnima', hi: 'पूर्णिमा' },
];

export const NAKSHATRAS: Bi[] = [
  { en: 'Ashwini', hi: 'अश्विनी' },
  { en: 'Bharani', hi: 'भरणी' },
  { en: 'Krittika', hi: 'कृत्तिका' },
  { en: 'Rohini', hi: 'रोहिणी' },
  { en: 'Mrigashira', hi: 'मृगशिरा' },
  { en: 'Ardra', hi: 'आर्द्रा' },
  { en: 'Punarvasu', hi: 'पुनर्वसु' },
  { en: 'Pushya', hi: 'पुष्य' },
  { en: 'Ashlesha', hi: 'अश्लेषा' },
  { en: 'Magha', hi: 'मघा' },
  { en: 'Purva Phalguni', hi: 'पूर्वाफाल्गुनी' },
  { en: 'Uttara Phalguni', hi: 'उत्तराफाल्गुनी' },
  { en: 'Hasta', hi: 'हस्त' },
  { en: 'Chitra', hi: 'चित्रा' },
  { en: 'Swati', hi: 'स्वाति' },
  { en: 'Vishakha', hi: 'विशाखा' },
  { en: 'Anuradha', hi: 'अनुराधा' },
  { en: 'Jyeshtha', hi: 'ज्येष्ठा' },
  { en: 'Mula', hi: 'मूल' },
  { en: 'Purva Ashadha', hi: 'पूर्वाषाढा' },
  { en: 'Uttara Ashadha', hi: 'उत्तराषाढा' },
  { en: 'Shravana', hi: 'श्रवण' },
  { en: 'Dhanishta', hi: 'धनिष्ठा' },
  { en: 'Shatabhisha', hi: 'शतभिषा' },
  { en: 'Purva Bhadrapada', hi: 'पूर्वाभाद्रपदा' },
  { en: 'Uttara Bhadrapada', hi: 'उत्तराभाद्रपदा' },
  { en: 'Revati', hi: 'रेवती' },
];

export const YOGAS: Bi[] = [
  { en: 'Vishkambha', hi: 'विष्कम्भ' },
  { en: 'Priti', hi: 'प्रीति' },
  { en: 'Ayushman', hi: 'आयुष्मान' },
  { en: 'Saubhagya', hi: 'सौभाग्य' },
  { en: 'Shobhana', hi: 'शोभन' },
  { en: 'Atiganda', hi: 'अतिगण्ड' },
  { en: 'Sukarma', hi: 'सुकर्मा' },
  { en: 'Dhriti', hi: 'धृति' },
  { en: 'Shula', hi: 'शूल' },
  { en: 'Ganda', hi: 'गण्ड' },
  { en: 'Vriddhi', hi: 'वृद्धि' },
  { en: 'Dhruva', hi: 'ध्रुव' },
  { en: 'Vyaghata', hi: 'व्याघात' },
  { en: 'Harshana', hi: 'हर्षण' },
  { en: 'Vajra', hi: 'वज्र' },
  { en: 'Siddhi', hi: 'सिद्धि' },
  { en: 'Vyatipata', hi: 'व्यतीपात' },
  { en: 'Variyana', hi: 'वरीयान' },
  { en: 'Parigha', hi: 'परिघ' },
  { en: 'Shiva', hi: 'शिव' },
  { en: 'Siddha', hi: 'सिद्ध' },
  { en: 'Sadhya', hi: 'साध्य' },
  { en: 'Shubha', hi: 'शुभ' },
  { en: 'Shukla', hi: 'शुक्ल' },
  { en: 'Brahma', hi: 'ब्रह्म' },
  { en: 'Indra', hi: 'ऐन्द्र' },
  { en: 'Vaidhriti', hi: 'वैधृति' },
];

export const KARANAS: Bi[] = [
  { en: 'Bava', hi: 'बव' },
  { en: 'Balava', hi: 'बालव' },
  { en: 'Kaulava', hi: 'कौलव' },
  { en: 'Taitila', hi: 'तैतिल' },
  { en: 'Gara', hi: 'गर' },
  { en: 'Vanija', hi: 'वणिज' },
  { en: 'Vishti', hi: 'विष्टि' },
];

export const FIXED_KARANAS: Record<number, Bi> = {
  56: { en: 'Shakuni', hi: 'शकुनि' },
  57: { en: 'Chatushpada', hi: 'चतुष्पाद' },
  58: { en: 'Naga', hi: 'नाग' },
  59: { en: 'Kimstughna', hi: 'किंतुघ्न' },
};

export const PAKSHA: Bi[] = [
  { en: 'Shukla', hi: 'शुक्ल' },
  { en: 'Krishna', hi: 'कृष्ण' },
];

/** Rahu Kaal segment index (0-7) per weekday, Sunday first. */
const RAHU_SEGMENT_BY_WEEKDAY = [7, 1, 6, 4, 3, 5, 2];

/** Sunrise / sunset for Indian latitudes using the standard sunrise equation. */
export function sunTimes(day: Date, lat = 28.6139, lon = 77.209): { sunrise: Date; sunset: Date } {
  const localNoon = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 12, 0, 0, 0);
  const jdNoon = toJD(localNoon);
  const n = Math.round(jdNoon - 2451545.0 + 0.0008);
  const jstar = n + lon / 360;
  const M = mod360(357.5291 + 0.98560028 * jstar);
  const C = 1.9148 * Math.sin(M * RAD) + 0.02 * Math.sin(2 * M * RAD) + 0.0003 * Math.sin(3 * M * RAD);
  const lambda = mod360(M + C + 180 + 102.9372);
  const jTransit = 2451545.0 + jstar + 0.0053 * Math.sin(M * RAD) - 0.0069 * Math.sin(2 * lambda * RAD);
  const sinDec = Math.sin(lambda * RAD) * Math.sin(23.4397 * RAD);
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosOmega = (Math.sin(-0.833 * RAD) - Math.sin(lat * RAD) * sinDec) / (Math.cos(lat * RAD) * cosDec);

  if (cosOmega > 1 || cosOmega < -1) {
    return { sunrise: fromJD(jTransit - 0.25), sunset: fromJD(jTransit + 0.25) };
  }
  const omega = Math.acos(cosOmega) / RAD;
  return { sunrise: fromJD(jTransit - omega / 360), sunset: fromJD(jTransit + omega / 360) };
}

export type Panchang = {
  tithiIndex: number;
  tithi: Bi;
  paksha: Bi;
  nakshatraIndex: number;
  nakshatra: Bi;
  pada: number;
  yogaIndex: number;
  yoga: Bi;
  karana: Bi;
  moonSign: number;
  sunSign: number;
  sunrise: Date;
  sunset: Date;
  rahuKaal: { start: Date; end: Date };
};

export function getPanchang(date: Date): Panchang {
  const noon = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0);
  const jd = toJD(noon);
  const sun = siderealSun(jd);
  const moon = siderealMoon(jd);

  const tithiFloat = mod360(moon - sun) / 12;
  const tithiIndex = Math.min(29, Math.floor(tithiFloat)); // 0..29
  const pakshaIndex = tithiIndex < 15 ? 0 : 1;
  const pakshaTithi = tithiIndex % 15;
  const tithi: Bi =
    pakshaTithi === 14
      ? pakshaIndex === 0
        ? { en: 'Purnima', hi: 'पूर्णिमा' }
        : { en: 'Amavasya', hi: 'अमावस्या' }
      : TITHIS[pakshaTithi];

  const nakshatraIndex = Math.min(26, Math.floor(mod360(moon) / (360 / 27)));
  const padaFloat = (mod360(moon) % (360 / 27)) / (360 / 108) + 1;
  const pada = Math.min(4, Math.floor(padaFloat));

  const yogaIndex = Math.min(26, Math.floor(mod360(sun + moon) / (360 / 27)));

  const half = Math.floor(mod360(moon - sun) / 6); // 0..59
  const karana = FIXED_KARANAS[half] ?? KARANAS[half % 7];

  const { sunrise, sunset } = sunTimes(date);
  const segment = (sunset.getTime() - sunrise.getTime()) / 8;
  const rahuIndex = RAHU_SEGMENT_BY_WEEKDAY[date.getDay()];
  const rahuStart = new Date(sunrise.getTime() + segment * rahuIndex);
  const rahuEnd = new Date(rahuStart.getTime() + segment);

  return {
    tithiIndex,
    tithi,
    paksha: PAKSHA[pakshaIndex],
    nakshatraIndex,
    nakshatra: NAKSHATRAS[nakshatraIndex],
    pada,
    yogaIndex,
    yoga: YOGAS[yogaIndex],
    karana,
    moonSign: Math.min(11, Math.floor(mod360(moon) / 30)),
    sunSign: Math.min(11, Math.floor(mod360(sun) / 30)),
    sunrise,
    sunset,
    rahuKaal: { start: rahuStart, end: rahuEnd },
  };
}

/** Moon sign (rashi) for a birth date — used during onboarding. */
export function moonSignFromDate(dob: Date): number {
  const jd = toJD(dob);
  return Math.min(11, Math.floor(siderealMoon(jd) / 30));
}
