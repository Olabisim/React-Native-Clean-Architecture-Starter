/**
 * App-wide spacing scale.
 * Use these instead of raw numbers so layout stays consistent.
 */
export const Spacing = {
  xs:  4,
  sm:  8,
  md:  12,
  base: 16,
  lg:  20,
  xl:  24,
  xxl: 32,
  xxxl: 48,
} as const;

export type SpacingKey = keyof typeof Spacing;
