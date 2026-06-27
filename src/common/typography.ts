/**
 * Centralised font-size + line-height scale.
 * Components consume these rather than hardcoding px values.
 */
export const FontSize = {
  xs:    11,
  sm:    13,
  base:  15,
  md:    17,
  lg:    20,
  xl:    24,
  xxl:   28,
  xxxl:  34,
} as const;

export const LineHeight = {
  xs:    16,
  sm:    18,
  base:  22,
  md:    24,
  lg:    28,
  xl:    32,
  xxl:   36,
  xxxl:  42,
} as const;

export type FontSizeKey = keyof typeof FontSize;
