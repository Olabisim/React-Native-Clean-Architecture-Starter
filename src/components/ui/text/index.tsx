/**
 * Text primitives
 *
 * Usage:
 *   <Heading>Title</Heading>
 *   <SubHeading>Section label</SubHeading>
 *   <Paragraph>Body copy</Paragraph>
 *   <SmallText>Caption</SmallText>
 *   <BoldText>Bold</BoldText>
 *   <SemiBoldText>Semi</SemiBoldText>
 *   <RegularText>Regular</RegularText>
 */

import { GRAY_500, NEAR_BLACK } from '@/common/colors';
import { FontSize, LineHeight } from '@/common/typography';
import React from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';

// ─── Base ─────────────────────────────────────────────────────────────────────

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
    style={[{ color, fontSize, fontWeight: '400' }, style]}
    {...rest}
  >
    {children}
  </Text>
);

// ─── Semantic variants ────────────────────────────────────────────────────────

/**
 * Page / section heading — large, bold.
 * Default: 28px bold
 */
export const Heading = ({
  color = NEAR_BLACK,
  fontSize = FontSize.xxl,
  style,
  children,
  ...rest
}: AppTextProps) => (
  <Text
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
 * Sub-heading / card title — medium weight, slightly smaller.
 * Default: 20px semi-bold
 */
export const SubHeading = ({
  color = NEAR_BLACK,
  fontSize = FontSize.lg,
  style,
  children,
  ...rest
}: AppTextProps) => (
  <Text
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
 * Body paragraph — regular weight, readable line-height.
 * Default: 15px regular
 */
export const Paragraph = ({
  color = GRAY_500,
  fontSize = FontSize.base,
  style,
  children,
  ...rest
}: AppTextProps) => (
  <Text
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
 * Small caption / label text.
 * Default: 11px regular
 */
export const SmallText = ({
  color = GRAY_500,
  fontSize = FontSize.xs,
  style,
  children,
  ...rest
}: AppTextProps) => (
  <Text
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
 * Small header / overline — uppercase, spaced, semi-bold.
 * Useful above sections as a label.
 */
export const SmallHeader = ({
  color = GRAY_500,
  fontSize = FontSize.xs,
  style,
  children,
  ...rest
}: AppTextProps) => (
  <Text
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
