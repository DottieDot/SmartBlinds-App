import { Theme, overlay } from "react-native-paper";
import Color from "color";

export const getPrimarySurfaceColor = (theme: Theme, elevation: number): string => 
  (theme.dark && (theme.mode === 'adaptive'))
    ? overlay(elevation, theme.colors.surface) as string // Can't be Animated.AnimatedInterpolation
    : theme.colors.primary

export const getContrastingTextColor = (color: string): string =>
  (Color(color).isDark())
    ? '#fff'
    : '#000'
