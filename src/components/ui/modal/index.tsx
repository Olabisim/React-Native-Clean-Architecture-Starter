/**
 * AppModal — a clean, accessible bottom-sheet-style modal.
 *
 * Usage:
 *   <AppModal
 *     visible={showModal}
 *     onClose={() => setShowModal(false)}
 *     title="Confirm action"
 *   >
 *     <Paragraph>Are you sure you want to continue?</Paragraph>
 *     <FullWidthButton label="Yes, continue" onPress={...} />
 *   </AppModal>
 */

import { GRAY_200, GRAY_400, NEAR_BLACK, WHITE } from '@/common/colors';
import { Spacing } from '@/common/spacing';
import { Heading } from '@/components/ui/text';
import React from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AppModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  /** Prevent closing by tapping the backdrop */
  dismissable?: boolean;
  children: React.ReactNode;
  /** Override the inner container style */
  contentStyle?: ViewStyle;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const AppModal = ({
  visible,
  onClose,
  title,
  dismissable = true,
  children,
  contentStyle,
}: AppModalProps) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <Pressable
        style={styles.backdrop}
        onPress={dismissable ? onClose : undefined}
        accessibilityLabel="Close modal"
        accessibilityRole="button"
      />

      {/* Sheet */}
      <SafeAreaView style={styles.sheetWrapper} edges={['bottom']}>
        <View style={[styles.sheet, contentStyle]}>

          {/* Drag handle */}
          <View style={styles.handle} accessibilityElementsHidden />

          {/* Header row */}
          {(title) && (
            <View style={styles.headerRow}>
              {title ? (
                <Heading fontSize={20} color={NEAR_BLACK}>
                  {title}
                </Heading>
              ) : (
                <View />
              )}

              {/* Close button */}
              <TouchableOpacity
                onPress={onClose}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                accessibilityRole="button"
                accessibilityLabel="Close"
              >
                <View style={styles.closeBtn}>
                  <CloseIcon />
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* Content */}
          <View style={styles.body}>{children}</View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

// ─── Close icon (pure RN, no vector-icons dep) ────────────────────────────────

const CloseIcon = () => (
  <View style={{ width: 14, height: 14 }}>
    {/* × using two rotated thin bars */}
    <View
      style={{
        position: 'absolute',
        width: 16,
        height: 2,
        backgroundColor: GRAY_400,
        borderRadius: 1,
        top: 6,
        left: -1,
        transform: [{ rotate: '45deg' }],
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: 16,
        height: 2,
        backgroundColor: GRAY_400,
        borderRadius: 1,
        top: 6,
        left: -1,
        transform: [{ rotate: '-45deg' }],
      }}
    />
  </View>
);

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheetWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  sheet: {
    backgroundColor: WHITE,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: Spacing.sm,
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.xl,
    // subtle shadow on iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: GRAY_200,
    marginBottom: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: GRAY_200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    gap: Spacing.md,
  },
});
