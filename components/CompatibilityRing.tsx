import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, { Easing, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { colors, fontSize, spacing } from '@/constants/theme';

type Props = {
  score: number;
  size?: number;
  caption?: string;
  subCaption?: string;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/** Animated SVG compatibility ring — stroke sweeps from 0 to the score. */
export default function CompatibilityRing({ score, size = 186, caption, subCaption }: Props) {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = useSharedValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(score / 100, { duration: 1300, easing: Easing.out(Easing.cubic) });

    let raf = 0;
    const start = Date.now();
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / 1300);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(score * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  return (
    <View style={styles.wrap}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="ringGold" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#fbbf24" />
            <Stop offset="0.5" stopColor="#f59e0b" />
            <Stop offset="1" stopColor="#7c3aed" />
          </LinearGradient>
        </Defs>
        <Circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth={strokeWidth} fill="none" />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#ringGold)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.center} pointerEvents="none">
        <Text style={styles.score}>{display}%</Text>
        {caption ? <Text style={styles.caption}>{caption}</Text> : null}
        {subCaption ? <Text style={styles.subCaption}>{subCaption}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  center: { position: 'absolute', alignItems: 'center', paddingHorizontal: spacing.lg },
  score: { color: colors.text, fontSize: 42, fontWeight: '900' },
  caption: { color: colors.goldLight, fontSize: fontSize.small, fontWeight: '700', marginTop: 2, textAlign: 'center' },
  subCaption: { color: colors.textFaint, fontSize: fontSize.tiny, marginTop: 2, textAlign: 'center' },
});
