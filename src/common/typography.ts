import { getRW } from './helpers';

/**
 * Centralised font-size + line-height scale.
 *
 * All sizes are run through getRW() so they scale relative to the reference
 * screen width (390pt / iPhone 14 Pro). This means the same visual size on
 * any device width.
 *
 * MAX_FONT_SCALE caps the OS-level accessibility font multiplier across the
 * entire app. 1.3 = users can go up to 130% of the design size before we
 * stop growing — enough to honour accessibility without breaking layouts.
 */

export const MAX_FONT_SCALE = 1.3;

const raw = {
  xs:   11,
  sm:   13,
  base: 15,
  md:   17,
  lg:   20,
  xl:   24,
  xxl:  28,
  xxxl: 34,
} as const;

/** Responsive font sizes — scaled to screen width */
export const FontSize = {
  xs:   getRW(raw.xs),
  sm:   getRW(raw.sm),
  base: getRW(raw.base),
  md:   getRW(raw.md),
  lg:   getRW(raw.lg),
  xl:   getRW(raw.xl),
  xxl:  getRW(raw.xxl),
  xxxl: getRW(raw.xxxl),
} as const;

/**
 * Line heights — always slightly larger than the matching FontSize.
 * These are also width-scaled so they stay proportional.
 */
export const LineHeight = {
  xs:   getRW(16),
  sm:   getRW(18),
  base: getRW(22),
  md:   getRW(24),
  lg:   getRW(28),
  xl:   getRW(32),
  xxl:  getRW(36),
  xxxl: getRW(42),
} as const;

export type FontSizeKey = keyof typeof FontSize;
