import { format } from 'date-fns';
import { UI, formatLongDate, pick, type Bi, type Lang } from '@/utils/i18n';
import { DIRECTIONS, LUCKY_COLORS, LUCKY_TIMES, MOODS, getSign } from '@/utils/zodiacData';
import {
  ASPECT_LABELS,
  BODIES,
  BOND_LEVELS,
  CATEGORY_META,
  CLOSERS,
  COMPAT_SUMMARIES,
  OPENERS,
  YEARLY,
  type Category,
  type Period,
} from '@/utils/predictionTemplates';

/** Mulberry32 — small, fast, deterministic PRNG. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** FNV-1a style string hash used to seed the PRNG. */
export function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export const dateKey = (d: Date): string => format(d, 'yyyy-MM-dd');

const between = (rng: () => number, min: number, max: number): number => Math.floor(rng() * (max - min + 1)) + min;

export type Prediction = {
  id: string;
  signId: number;
  category: Category;
  period: Period;
  dateKey: string;
  date: Date;
  stars: number;
  score: number;
  mood: Bi;
  paragraphs: Bi[];
  luckyNumber: number;
  luckyColor: Bi;
  luckyColorHex: string;
  luckyTime: Bi;
  luckyDirection: Bi;
  luckyStone: Bi;
  verdict: Bi;
};

export type Compatibility = {
  id: string;
  aId: number;
  bId: number;
  score: number;
  aspects: { key: string; label: Bi; value: number }[];
  summary: Bi;
  bond: Bi;
};

export type YearMonth = {
  monthIndex: number;
  stars: number;
  score: number;
  text: Bi;
};

/** Deterministic, seeded prediction for a sign/category/period/date. */
export function getPrediction(signId: number, category: Category, period: Period, date: Date): Prediction {
  const sign = getSign(signId);
  const key = dateKey(date);
  const rng = mulberry32(hashSeed(`${signId}|${category}|${period}|${key}`));

  const stars = Math.max(1, Math.min(5, Math.round(3 + (rng() - 0.45) * 3.6)));
  const score = Math.min(99, stars * 20 + between(rng, -4, 8));

  const openerBank = OPENERS[category][period];
  const opener = pick(openerBank, between(rng, 0, openerBank.length - 1));
  const bodyBank = BODIES[category];
  const first = pick(bodyBank, between(rng, 0, bodyBank.length - 1));
  let second = pick(bodyBank, between(rng, 0, bodyBank.length - 1));
  let guard = 0;
  while (second.en === first.en && guard < 6) {
    second = pick(bodyBank, between(rng, 0, bodyBank.length - 1));
    guard += 1;
  }
  const closer = pick(CLOSERS, between(rng, 0, CLOSERS.length - 1));
  const color = pick(LUCKY_COLORS, between(rng, 0, LUCKY_COLORS.length - 1));
  const time = pick(LUCKY_TIMES, between(rng, 0, LUCKY_TIMES.length - 1));
  const direction = pick(DIRECTIONS, (sign.id + between(rng, 0, 7)) % DIRECTIONS.length);
  const mood = pick(MOODS, between(rng, 0, MOODS.length - 1));

  return {
    id: `${sign.id}-${category}-${period}-${key}`,
    signId: sign.id,
    category,
    period,
    dateKey: key,
    date,
    stars,
    score,
    mood,
    paragraphs: [opener, first, second],
    luckyNumber: between(rng, 1, 9),
    luckyColor: color.label,
    luckyColorHex: color.hex,
    luckyTime: time,
    luckyDirection: direction,
    luckyStone: sign.stone,
    verdict: closer,
  };
}

/** Extra predictions for browsing other signs (used in favourites + share sheet). */
export function getPredictionBySign(signId: number, category: Category, period: Period, date: Date): Prediction {
  return getPrediction(signId, category, period, date);
}

export function getAllSignPredictions(category: Category, period: Period, date: Date): Prediction[] {
  return Array.from({ length: 12 }, (_, i) => getPrediction(i, category, period, date));
}

/** Deterministic kundli-style compatibility (order independent). */
export function getCompatibility(aId: number, bId: number): Compatibility {
  const low = Math.min(aId, bId);
  const high = Math.max(aId, bId);
  const id = `${low}-${high}`;
  const rng = mulberry32(hashSeed(`kundli|${id}`));
  const distance = Math.min(Math.abs(aId - bId), 12 - Math.abs(aId - bId));
  const harmony = 1 - distance / 6; // opposite or same signs are traditionally significant

  const aspects = ASPECT_LABELS.map((aspect) => {
    const base = 42 + harmony * 24;
    const value = Math.max(28, Math.min(99, Math.round(base + between(rng, 4, 30))));
    return { key: aspect.key, label: aspect.label, value };
  });

  const score = Math.round(aspects.reduce((sum, a) => sum + a.value, 0) / aspects.length);
  const summary = pick(COMPAT_SUMMARIES.filter((s) => score >= s.min), 0).text;
  const bond = pick(BOND_LEVELS.filter((b) => score >= b.min), 0).label;

  return { id, aId, bId, score, aspects, summary, bond };
}

/** 12-month yearly horoscope, deterministic per sign + year + month. */
export function getYearlyMonth(signId: number, year: number, monthIndex: number): YearMonth {
  const rng = mulberry32(hashSeed(`yearly|${signId}|${year}|${monthIndex}`));
  const stars = Math.max(1, Math.min(5, Math.round(3 + (rng() - 0.45) * 3.4)));
  const score = Math.min(99, stars * 20 + between(rng, -3, 8));
  const bank = YEARLY[monthIndex];
  return {
    monthIndex,
    stars,
    score,
    text: pick(bank, between(rng, 0, bank.length - 1)),
  };
}

const starsString = (n: number): string => `${'★'.repeat(n)}${'☆'.repeat(5 - n)}`;

export function buildShareText(prediction: Prediction, lang: Lang, name?: string): string {
  const sign = getSign(prediction.signId);
  const other: Lang = lang === 'hi' ? 'en' : 'hi';
  const header = `✦ ${UI.appName.en} · ${UI.appName.hi}`;
  const sub = `${formatLongDate(prediction.date, lang)}  |  ${sign.symbol} ${sign.name.en} · ${sign.name.hi}`;
  const label = `${CATEGORY_META[prediction.category].label[lang]} · ${prediction.period === 'daily' ? UI.daily[lang] : prediction.period === 'weekly' ? UI.weekly[lang] : UI.monthly[lang]}`;
  const greeting = name ? `${UI.hello[lang]}, ${name}!` : '';
  const body = prediction.paragraphs.map((p) => `• ${p[lang]}`).join('\n');
  const verdict = `${prediction.verdict[lang]} / ${prediction.verdict[other]}`;
  const lucky = [
    `⭐ ${starsString(prediction.stars)} (${prediction.stars}/5) · ${UI.fortune[lang]} ${prediction.score}%`,
    `🎨 ${UI.luckyColor[lang]}: ${prediction.luckyColor[lang]} / ${prediction.luckyColor[other]}`,
    `🔢 ${UI.luckyNumber[lang]}: ${prediction.luckyNumber}`,
    `⏰ ${UI.luckyTime[lang]}: ${prediction.luckyTime[lang]}`,
    `🧭 ${UI.luckyDirection[lang]}: ${prediction.luckyDirection[lang]} / ${prediction.luckyDirection[other]}`,
  ].join('\n');

  return [header, sub, `${sign.symbol} ${label}`, greeting, '', body, '', `✦ ${verdict}`, '', lucky, '', `— ${UI.appName.en} / ${UI.appName.hi}`]
    .filter((line) => line !== undefined)
    .join('\n');
}

export function buildKundliShareText(compat: Compatibility, lang: Lang): string {
  const a = getSign(compat.aId);
  const b = getSign(compat.bId);
  const aspects = compat.aspects.map((x) => `• ${x.label[lang]}: ${x.value}%`).join('\n');
  return [
    `✦ ${UI.kundli[lang]} · ${UI.appName[lang]}`,
    `${a.symbol} ${a.name.en} · ${a.name.hi}  +  ${b.symbol} ${b.name.en} · ${b.name.hi}`,
    '',
    `${UI.compatibility[lang]}: ${compat.score}%  (${compat.bond[lang]})`,
    aspects,
    '',
    `✦ ${compat.summary[lang]}`,
    '',
    `— ${UI.appName.en} / ${UI.appName.hi}`,
  ].join('\n');
}

export function buildYearlyShareText(signId: number, year: number, lang: Lang): string {
  const sign = getSign(signId);
  const lines = Array.from({ length: 12 }, (_, m) => {
    const ym = getYearlyMonth(signId, year, m);
    const monthName =
      lang === 'hi'
        ? ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'][m]
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m];
    return `• ${monthName} ${starsString(ym.stars)} — ${ym.text[lang]}`;
  });
  return [`✦ ${UI.yearly[lang]} ${year} · ${sign.symbol} ${sign.name.en} · ${sign.name.hi}`, '', ...lines, '', `— ${UI.appName.en} / ${UI.appName.hi}`].join('\n');
}
