/**
 * Button primitives
 *
 * Usage:
 *   <FullWidthButton label="Continue" onPress={...} />
 *   <MediumButton label="Save" onPress={...} variant="outline" />
 *   <SmallButton label="Edit" onPress={...} />
 *   <IconButton icon="←" onPress={...} />
 */

import { BRAND_COLOR, BRAND_COLOR_LIGHT, ERROR, GRAY_200, GRAY_500, WHITE } from '@/common/colors';
import { Spacing } from '@/common/spacing';
import { FontSize } from '@/common/typography';
import { SemiBoldText } from '@/components/ui/text';
import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    ViewStyle
} from 'react-native';

// ─── Types ────────────────────────────────────────────────────────────────────

type ButtonVariant = 'filled' | 'outline' | 'ghost' | 'danger';

interface BaseButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveColors(variant: ButtonVariant, disabled: boolean) {
  if (disabled) {
    return { bg: GRAY_200, text: GRAY_500, border: GRAY_200 };
  }
  switch (variant) {
    case 'outline':
      return { bg: WHITE, text: BRAND_COLOR, border: BRAND_COLOR };
    case 'ghost':
      return { bg: BRAND_COLOR_LIGHT, text: BRAND_COLOR, border: 'transparent' };
    case 'danger':
      return { bg: ERROR, text: WHITE, border: ERROR };
    case 'filled':
    default:
      return { bg: BRAND_COLOR, text: WHITE, border: BRAND_COLOR };
  }
}

// ─── Full Width Button ────────────────────────────────────────────────────────

export const FullWidthButton = ({
  label,
  onPress,
  variant = 'filled',
  disabled = false,
  loading = false,
  style,
  labelStyle,
}: BaseButtonProps) => {
  const { bg, text, border } = resolveColors(variant, disabled || loading);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.fullWidth,
        { backgroundColor: bg, borderColor: border },
        variant === 'outline' && styles.bordered,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator color={text} size="small" />
      ) : (
        <SemiBoldText color={text} fontSize={FontSize.md} style={labelStyle}>
          {label}
        </SemiBoldText>
      )}
    </TouchableOpacity>
  );
};

// ─── Medium Button ────────────────────────────────────────────────────────────

export const MediumButton = ({
  label,
  onPress,
  variant = 'filled',
  disabled = false,
  loading = false,
  style,
  labelStyle,
}: BaseButtonProps) => {
  const { bg, text, border } = resolveColors(variant, disabled || loading);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.medium,
        { backgroundColor: bg, borderColor: border },
        variant === 'outline' && styles.bordered,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator color={text} size="small" />
      ) : (
        <SemiBoldText color={text} fontSize={FontSize.base} style={labelStyle}>
          {label}
        </SemiBoldText>
      )}
    </TouchableOpacity>
  );
};

// ─── Small Button ─────────────────────────────────────────────────────────────

export const SmallButton = ({
  label,
  onPress,
  variant = 'filled',
  disabled = false,
  loading = false,
  style,
  labelStyle,
}: BaseButtonProps) => {
  const { bg, text, border } = resolveColors(variant, disabled || loading);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.small,
        { backgroundColor: bg, borderColor: border },
        variant === 'outline' && styles.bordered,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator color={text} size="small" />
      ) : (
        <SemiBoldText color={text} fontSize={FontSize.sm} style={labelStyle}>
          {label}
        </SemiBoldText>
      )}
    </TouchableOpacity>
  );
};

// ─── Icon Button (circular) ───────────────────────────────────────────────────

interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  backgroundColor?: string;
  size?: number;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

export const IconButton = ({
  icon,
  onPress,
  backgroundColor = BRAND_COLOR,
  size = 40,
  style,
  accessibilityLabel = 'icon button',
}: IconButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={[
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
      },
      style,
    ]}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
  >
    {icon}
  </TouchableOpacity>
);

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  medium: {
    height: 44,
    paddingHorizontal: Spacing.xl,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  small: {
    height: 32,
    paddingHorizontal: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  bordered: {
    borderWidth: 1.5,
  },
});
