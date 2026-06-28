/**
 * Text primitives
 *
 * Every component:
 *  - uses getRW()-scaled FontSize values (width-responsive)
 *  - sets maxFontSizeMultiplier so OS accessibility scaling can't break layouts
 *
 * Usage:
 *   <Heading>Title</Heading>
 *   <SubHeading>Section label</SubHeading>
 *   <Paragraph>Body copy</Paragraph>
 *   <SmallText>Caption</SmallText>
 *   <SmallHeader>OVERLINE</SmallHeader>
 *   <BoldText>Bold</BoldText>
 *   <SemiBoldText>Semi</SemiBoldText>
 *   <RegularText>Regular</RegularText>
 */

import { GRAY_500, NEAR_BLACK } from '@/common/colors';
import { FontSize, LineHeight, MAX_FONT_SCALE } from '@/common/typography';
import React from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';

// ─── Base interface ───────────────────────────────────────────────────────────

interface AppTextProps extends TextProps {
  color?: string;
  fontSize?: number;
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
}

// ─── Weight variants ──────────────────────────────────────────────────────────

export const BoldText = ({
  color = NEAR_BLACK,
  fontSize = FontSize.base,
  style,
  children,
  ...rest
}: AppTextProps) => (
  <Text
    maxFontSizeMultiplier={MAX_FONT_SCALE}
    style={[{ color, fontSize, fontWeight: '700' }, style]}
    {...rest}
  >
    {children}
  </Text>
);

export const SemiBoldText = ({
  color = NEAR_BLACK,
  fontSize = FontSize.base,
  style,
  children,
  ...rest
}: AppTextProps) => (
  <Text
    maxFontSizeMultiplier={MAX_FONT_SCALE}
    style={[{ color, fontSize, fontWeight: '600' }, style]}
    {...rest}
  >
    {children}
  </Text>
);

export const RegularText = ({
  color = NEAR_BLACK,
  fontSize = FontSize.base,
  style,
  children,
  ...rest
}: AppTextProps) => (
  <Text
    maxFontSizeMultiplier={MAX_FONT_SCALE}
    style={[{ color, fontSize, fontWeight: '400' }, style]}
    {...rest}
  >
    {children}
  </Text>
);

// ─── Semantic variants ────────────────────────────────────────────────────────

/**
 * Page / section heading — large, bold.
 * Default: ~28px (width-scaled), bold
 */
export const Heading = ({
  color = NEAR_BLACK,
  fontSize = FontSize.xxl,
  style,
  children,
  ...rest
}: AppTextProps) => (
  <Text
    maxFontSizeMultiplier={MAX_FONT_SCALE}
    style={[
      styles.heading,
      { color, fontSize, lineHeight: LineHeight.xxl },
      style,
    ]}
    {...rest}
  >
    {children}
  </Text>
);

/**
 * Sub-heading / card title — semi-bold.
 * Default: ~20px (width-scaled)
 */
export const SubHeading = ({
  color = NEAR_BLACK,
  fontSize = FontSize.lg,
  style,
  children,
  ...rest
}: AppTextProps) => (
  <Text
    maxFontSizeMultiplier={MAX_FONT_SCALE}
    style={[
      styles.subHeading,
      { color, fontSize, lineHeight: LineHeight.lg },
      style,
    ]}
    {...rest}
  >
    {children}
  </Text>
);

/**
 * Body paragraph — regular weight, comfortable line-height.
 * Default: ~15px (width-scaled)
 */
export const Paragraph = ({
  color = GRAY_500,
  fontSize = FontSize.base,
  style,
  children,
  ...rest
}: AppTextProps) => (
  <Text
    maxFontSizeMultiplier={MAX_FONT_SCALE}
    style={[
      styles.paragraph,
      { color, fontSize, lineHeight: LineHeight.base },
      style,
    ]}
    {...rest}
  >
    {children}
  </Text>
);

/**
 * Small caption / label.
 * Default: ~11px (width-scaled)
 */
export const SmallText = ({
  color = GRAY_500,
  fontSize = FontSize.xs,
  style,
  children,
  ...rest
}: AppTextProps) => (
  <Text
    maxFontSizeMultiplier={MAX_FONT_SCALE}
    style={[
      styles.small,
      { color, fontSize, lineHeight: LineHeight.xs },
      style,
    ]}
    {...rest}
  >
    {children}
  </Text>
);

/**
 * Overline / section label — uppercase, tracked, semi-bold.
 * Default: ~11px (width-scaled)
 */
export const SmallHeader = ({
  color = GRAY_500,
  fontSize = FontSize.xs,
  style,
  children,
  ...rest
}: AppTextProps) => (
  <Text
    maxFontSizeMultiplier={MAX_FONT_SCALE}
    style={[
      styles.smallHeader,
      { color, fontSize },
      style,
    ]}
    {...rest}
  >
    {children}
  </Text>
);

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  heading: {
    fontWeight: '700',
  },
  subHeading: {
    fontWeight: '600',
  },
  paragraph: {
    fontWeight: '400',
  },
  small: {
    fontWeight: '400',
  },
  smallHeader: {
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});
