import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { useStore } from '@/store/useStore';
import { UI } from '@/utils/i18n';

type Props = {
  visible: boolean;
  onClose: () => void;
  onShareText: () => void;
  onShareImage: () => void;
};

/** Custom bottom sheet (no third-party bottom-sheet dependency) for share actions. */
export default function ShareBottomSheet({ visible, onClose, onShareText, onShareImage }: Props) {
  const insets = useSafeAreaInsets();
  const lang = useStore((s) => s.language);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityRole="button" accessibilityLabel={UI.cancel[lang]}>
        <Animated.View entering={FadeInUp.duration(220)} style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}>
          <View style={styles.handle} />
          <Text style={styles.title}>{UI.share[lang]}</Text>

          <Pressable style={styles.option} onPress={onShareText} accessibilityRole="button">
            <View style={[styles.optionIcon, { backgroundColor: 'rgba(96,165,250,0.16)' }]}>
              <Ionicons name="text" size={18} color={colors.blue} />
            </View>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>{UI.shareAsText[lang]}</Text>
              <Text style={styles.optionSub}>{lang === 'hi' ? 'राशिफल टेक्स्ट के रूप में' : 'Prediction as plain text'}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textFaint} />
          </Pressable>

          <Pressable style={styles.option} onPress={onShareImage} accessibilityRole="button">
            <View style={[styles.optionIcon, { backgroundColor: 'rgba(245,158,11,0.16)' }]}>
              <Ionicons name="image" size={18} color={colors.gold} />
            </View>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>{UI.shareAsImage[lang]}</Text>
              <Text style={styles.optionSub}>{lang === 'hi' ? 'कार्ड को PNG चित्र में बदलें' : 'Render the card as a PNG'}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textFaint} />
          </Pressable>

          <Pressable style={styles.cancel} onPress={onClose} accessibilityRole="button">
            <Text style={styles.cancelText}>{UI.cancel[lang]}</Text>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(4,4,14,0.72)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.cardSolid,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  handle: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.18)',
    marginBottom: spacing.sm,
  },
  title: { color: colors.text, fontSize: fontSize.h3, fontWeight: '800', marginBottom: spacing.xs },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  optionIcon: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  optionText: { flex: 1 },
  optionTitle: { color: colors.text, fontSize: fontSize.body, fontWeight: '700' },
  optionSub: { color: colors.textFaint, fontSize: fontSize.tiny, marginTop: 2 },
  cancel: { alignItems: 'center', paddingVertical: spacing.md, marginTop: spacing.xs },
  cancelText: { color: colors.textDim, fontSize: fontSize.body, fontWeight: '600' },
});
