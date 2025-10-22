import { useTheme } from '@mui/material/styles';
import { colorProfiles } from '@/styles/theme';

/**
 * Custom hook to get theme-aware colors
 * Automatically switches between light and dark theme colors
 * Pantone colors remain consistent across themes
 */
export const useThemeColors = () => {
  const theme = useTheme();
  const isDark = theme.palette?.mode === 'dark';

  return {
    // Text colors
    text: {
      primary: isDark ? colorProfiles.whites.main : colorProfiles.blacks.main,
      secondary: isDark ? colorProfiles.whites.light : colorProfiles.blacks.light,
      tertiary: isDark ? colorProfiles.whites.dark : colorProfiles.blacks.dark,
    },

    // Background colors
    background: {
      primary: isDark ? colorProfiles.blacks.main : colorProfiles.whites.main,
      secondary: isDark ? colorProfiles.blacks.light : colorProfiles.whites.light,
      tertiary: isDark ? colorProfiles.blacks.dark : colorProfiles.whites.dark,
    },

    // Border colors
    border: {
      primary: isDark ? colorProfiles.whites.main : colorProfiles.blacks.main,
      secondary: isDark ? colorProfiles.whites.light : colorProfiles.blacks.light,
      tertiary: isDark ? colorProfiles.whites.dark : colorProfiles.blacks.dark,
    },

    // Pantone colors (consistent across themes)
    pantone: colorProfiles.pantones,

    // Grey colors (consistent across themes)
    grey: colorProfiles.greys,
    white:colorProfiles.whites,
    black:colorProfiles.blacks,
    // Helper to get contrast color (opposite of current theme)
    contrast: {
      text: isDark ? colorProfiles.blacks.main : colorProfiles.whites.main,
      background: isDark ? colorProfiles.whites.main : colorProfiles.blacks.main,
      border: isDark ? colorProfiles.blacks.main : colorProfiles.whites.main,
    },

    // Theme mode
    isDark,
    isLight: !isDark,

    // Component-specific color getters
    getCheckboxTheme: () => isDark ? 'white' : 'black',
    getButtonTheme: () => isDark ? 'white' : 'black',
  };
};

export default useThemeColors;