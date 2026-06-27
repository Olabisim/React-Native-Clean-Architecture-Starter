import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/** Reference dimensions (iPhone 14 Pro) */
const BASE_WIDTH  = 390;
const BASE_HEIGHT = 844;

/**
 * Responsive height — scales a value relative to the reference screen height.
 * @example getRH(40) → 40 on a 844pt screen, proportionally more/less otherwise
 */
export const getRH = (value: number): number =>
  (value / BASE_HEIGHT) * SCREEN_HEIGHT;

/**
 * Responsive width — scales a value relative to the reference screen width.
 * @example getRW(20) → 20 on a 390pt screen, proportionally more/less otherwise
 */
export const getRW = (value: number): number =>
  (value / BASE_WIDTH) * SCREEN_WIDTH;
