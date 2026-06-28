/**
 * Screen primitives
 *
 * AppScreen         — handles SafeAreaView + KeyboardAvoidingView + optional scroll
 * PageHeaderWithGoback — back button row with optional title, sub-label, right action
 *
 * Usage:
 *   <AppScreen header={<PageHeaderWithGoback label="Settings" />}>
 *     <Paragraph>Content here</Paragraph>
 *   </AppScreen>
 */

import { BRAND_COLOR, GRAY_500, NEAR_BLACK, WHITE } from '@/common/colors';
import { getRH, getRW } from '@/common/helpers';
import { Spacing } from '@/common/spacing';
import { FontSize } from '@/common/typography';
import { BoldText, RegularText, SemiBoldText } from '@/components/ui/text';
import { useNavigation } from 'expo-router';
import React, { ReactElement } from 'react';
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ─── Separator ────────────────────────────────────────────────────────────────

interface SeparatorProps {
  width?: number;
  height?: number;
}

const Separator = ({ width = 0, height = Spacing.sm }: SeparatorProps) => (
  <View style={{ width, height }} />
);

// ─── Back icon button ─────────────────────────────────────────────────────────

const BackIcon = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={styles.backBtn}
    accessibilityRole="button"
    accessibilityLabel="Go back"
  >
    {/* Arrow built from two lines — no external icon dep */}
    <ArrowLeft />
  </TouchableOpacity>
);

const ArrowLeft = () => (
  <View style={{ width: 18, height: 18, justifyContent: 'center' }}>
    {/* horizontal bar */}
    <View style={styles.arrowH} />
    {/* top-left angled bar */}
    <View style={[styles.arrowV, { top: 1, transform: [{ rotate: '45deg' }] }]} />
    {/* bottom-left angled bar */}
    <View style={[styles.arrowV, { bottom: 1, transform: [{ rotate: '-45deg' }] }]} />
  </View>
);

// ─── AppScreen ────────────────────────────────────────────────────────────────

export interface AppScreenProps {
  children: React.ReactNode;
  /** Wrap content in a ScrollView (default: true) */
  scrollable?: boolean;
  /** Node rendered above the scrollable area but inside KAV */
  header?: React.ReactNode;
  /** Override the SafeAreaView background */
  backgroundColor?: string;
  /** Extra padding applied to the horizontal edges of the content */
  horizontalPadding?: number;
  style?: ViewStyle;
}

export const AppScreen = ({
  children,
  scrollable = true,
  header,
  backgroundColor = WHITE,
  horizontalPadding = Spacing.base,
  style,
}: AppScreenProps) => {
  const content = (
    <View style={[styles.flex, { paddingHorizontal: horizontalPadding }, style]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {header && (
          <View style={{ paddingHorizontal: horizontalPadding }}>
            {header}
          </View>
        )}

        {scrollable ? (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {content}
          </ScrollView>
        ) : (
          content
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ─── PageHeaderWithGoback ─────────────────────────────────────────────────────

export interface PageHeaderWithGobackProps {
  label: string;
  subLabel?: string | ReactElement;
  disabled?: boolean;
  centerText?: boolean;
  goBackAction?: () => void;
  rightComp?: {
    image?: ImageSourcePropType;
    onPress: () => void;
    buttonLabel: string;
    buttonLoading?: boolean;
  };
}

export const PageHeaderWithGoback: React.FC<PageHeaderWithGobackProps> = ({
  centerText = false,
  label,
  subLabel,
  disabled = false,
  goBackAction,
  rightComp,
}) => {
  const navigation = useNavigation();

  const renderRight = () => {
    if (!rightComp) return null;
    const { image, onPress, buttonLabel, buttonLoading } = rightComp;

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={buttonLoading}
        activeOpacity={0.75}
        style={styles.rightBtn}
        accessibilityRole="button"
        accessibilityLabel={buttonLabel}
      >
        <View style={styles.rightBtnInner}>
          {image && (
            <Image
              source={image}
              style={{ width: getRW(20), height: getRH(20) }}
              resizeMode="contain"
            />
          )}
          <SemiBoldText color={BRAND_COLOR} fontSize={FontSize.sm} style={{ marginLeft: image ? 6 : 0 }}>
            {buttonLabel}
          </SemiBoldText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View
        {...(disabled && { pointerEvents: 'none' as const })}
        style={styles.headerRow}
      >
        {/* Left: back + title stack */}
        <View style={styles.leftGroup}>
          <BackIcon onPress={goBackAction ?? (navigation.goBack as () => void)} />
          <Separator width={Spacing.base} height={0} />
          <View style={styles.titleGroup}>
            <BoldText
              fontSize={FontSize.xxl}
              color={NEAR_BLACK}
              style={centerText ? { textAlign: 'center' } : undefined}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {label}
            </BoldText>

            {subLabel
              ? typeof subLabel === 'string'
                ? (
                  <RegularText
                    fontSize={FontSize.sm}
                    color={GRAY_500}
                    style={centerText ? { textAlign: 'center' } : undefined}
                  >
                    {subLabel}
                  </RegularText>
                )
                : subLabel
              : null}
          </View>
        </View>

        {/* Right action */}
        {rightComp && <View>{renderRight()}</View>}
      </View>

      <Separator height={Spacing.md} />
    </>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Spacing.xxl,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BRAND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowH: {
    position: 'absolute',
    width: 12,
    height: 2,
    backgroundColor: WHITE,
    borderRadius: 1,
    left: 2,
  },
  arrowV: {
    position: 'absolute',
    width: 8,
    height: 2,
    backgroundColor: WHITE,
    borderRadius: 1,
    left: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleGroup: {
    flexShrink: 1,
    gap: 2,
  },
  rightBtn: {
    height: getRH(40),
    paddingHorizontal: Spacing.md,
    justifyContent: 'center',
  },
  rightBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
