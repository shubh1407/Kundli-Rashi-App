import { useEffect, useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { colors } from '@/constants/theme';
import { mulberry32, hashSeed } from '@/utils/contentEngine';

const { width, height } = Dimensions.get('window');

type Star = { left: number; top: number; size: number; opacity: number; delay: number };

function TwinklingStar({ star }: { star: Star }) {
  const opacity = useSharedValue(star.opacity);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(Math.max(0.12, star.opacity * 0.25), { duration: 1400 + star.delay, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [opacity, star.delay, star.opacity]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[
        styles.star,
        { left: star.left, top: star.top, width: star.size, height: star.size, borderRadius: star.size / 2 },
        style,
      ]}
    />
  );
}

/** Static + twinkling starfield used behind every screen. */
export default function StarField({ count = 46, seed = 'daily-rashifal' }: { count?: number; seed?: string }) {
  const stars = useMemo<Star[]>(() => {
    const rng = mulberry32(hashSeed(seed));
    return Array.from({ length: count }, (_, i) => ({
      left: rng() * (width - 6),
      top: rng() * (height - 12),
      size: rng() > 0.86 ? 3 : rng() > 0.6 ? 2 : 1.5,
      opacity: 0.25 + rng() * 0.6,
      delay: (i % 5) * 220,
    }));
  }, [count, seed]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {stars.map((star, index) => (
        <View key={`star-${index}`} style={{ position: 'absolute' }}>
          <TwinklingStar star={star} />
        </View>
      ))}
      <View style={styles.moon} />
      <View style={styles.glow} />
    </View>
  );
}

const styles = StyleSheet.create({
  star: { position: 'absolute', backgroundColor: colors.white },
  moon: {
    position: 'absolute',
    top: 46,
    right: 34,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(244,242,255,0.08)',
    shadowColor: '#f4f2ff',
    shadowOpacity: 0.35,
    shadowRadius: 18,
  },
  glow: {
    position: 'absolute',
    top: -120,
    alignSelf: 'center',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(124,58,237,0.16)',
  },
});
