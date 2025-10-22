import { createTheme, ThemeOptions } from "@mui/material/styles";

// Universe Club Color Profiles
const colorProfiles = {
  blacks: {
    light: "#4E4E4E",
    main: "#282828",
    dark: "#222222",
  },
  greys: {
    light: "#989898",
    main: "#7F7F7F",
    dark: "#666666",
  },
  whites: {
    light: "#E5E5E5",
    main: "#E0E0E0",
    dark: "#D5D5D5",
  },
  pantones: {
    light: "#C16F2C",
    main: "#A9550F",
    dark: "#7C4519",
  },
};

// Define primary color palette using pantones for primary and blacks for secondary
const colors = {
  primary: {
    main: colorProfiles.pantones.main,
    light: colorProfiles.pantones.light,
    dark: colorProfiles.pantones.dark,
    contrastText: colorProfiles.whites.main,
  },
  secondary: {
    main: colorProfiles.blacks.main,
    light: colorProfiles.blacks.light,
    dark: colorProfiles.blacks.dark,
    contrastText: colorProfiles.whites.main,
  },
  // Add custom color profiles to palette
  blacks: colorProfiles.blacks,
  greys: colorProfiles.greys,
  whites: colorProfiles.whites,
  pantones: colorProfiles.pantones,
};

// Extended Material-UI palette interface
declare module "@mui/material/styles" {
  interface Palette {
    blacks: {
      light: string;
      main: string;
      dark: string;
    };
    greys: {
      light: string;
      main: string;
      dark: string;
    };
    whites: {
      light: string;
      main: string;
      dark: string;
    };
    pantones: {
      light: string;
      main: string;
      dark: string;
    };
  }

  interface PaletteOptions {
    blacks?: {
      light: string;
      main: string;
      dark: string;
    };
    greys?: {
      light: string;
      main: string;
      dark: string;
    };
    whites?: {
      light: string;
      main: string;
      dark: string;
    };
    pantones?: {
      light: string;
      main: string;
      dark: string;
    };
  }

  interface TypographyVariants {
    h1Bold: React.CSSProperties;
    h1Regular: React.CSSProperties;
    h1Light: React.CSSProperties;
    h2Bold: React.CSSProperties;
    h2Regular: React.CSSProperties;
    h2Light: React.CSSProperties;
    h3Bold: React.CSSProperties;
    h3Regular: React.CSSProperties;
    h3Light: React.CSSProperties;
    h4Bold: React.CSSProperties;
    h4Regular: React.CSSProperties;
    h4Light: React.CSSProperties;
    headlineBold: React.CSSProperties;
    headlineRegular: React.CSSProperties;
    headlineLight: React.CSSProperties;
    bodyBold: React.CSSProperties;
    bodyRegular: React.CSSProperties;
    bodyLight: React.CSSProperties;
    subtitleBold: React.CSSProperties;
    subtitleRegular: React.CSSProperties;
    subtitleLight: React.CSSProperties;
    captionBold: React.CSSProperties;
    captionRegular: React.CSSProperties;
    captionLight: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    h1Bold?: React.CSSProperties;
    h1Regular?: React.CSSProperties;
    h1Light?: React.CSSProperties;
    h2Bold?: React.CSSProperties;
    h2Regular?: React.CSSProperties;
    h2Light?: React.CSSProperties;
    h3Bold?: React.CSSProperties;
    h3Regular?: React.CSSProperties;
    h3Light?: React.CSSProperties;
    h4Bold?: React.CSSProperties;
    h4Regular?: React.CSSProperties;
    h4Light?: React.CSSProperties;
    headlineBold?: React.CSSProperties;
    headlineRegular?: React.CSSProperties;
    headlineLight?: React.CSSProperties;
    bodyBold?: React.CSSProperties;
    bodyRegular?: React.CSSProperties;
    bodyLight?: React.CSSProperties;
    subtitleBold?: React.CSSProperties;
    subtitleRegular?: React.CSSProperties;
    subtitleLight?: React.CSSProperties;
    captionBold?: React.CSSProperties;
    captionRegular?: React.CSSProperties;
    captionLight?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h1Bold: true;
    h1Regular: true;
    h1Light: true;
    h2Bold: true;
    h2Regular: true;
    h2Light: true;
    h3Bold: true;
    h3Regular: true;
    h3Light: true;
    h4Bold: true;
    h4Regular: true;
    h4Light: true;
    headlineBold: true;
    headlineRegular: true;
    headlineLight: true;
    bodyBold: true;
    bodyRegular: true;
    bodyLight: true;
    subtitleBold: true;
    subtitleRegular: true;
    subtitleLight: true;
    captionBold: true;
    captionRegular: true;
    captionLight: true;
  }
}

// Custom component styles for buttons
const buttonStyles = {
  common: {
    fontFamily: "Hanken Grotesk, sans-serif",
    fontSize: "16px",
    fontWeight: 300,
    borderRadius: "999px",
    padding: "10px 40px",
    textTransform: "none" as const,
    transition: "all 300ms ease-out",
    height: "41px",
  },
};

// Base theme configuration
const baseThemeOptions: ThemeOptions = {
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    blacks: colors.blacks,
    greys: colors.greys,
    whites: colors.whites,
    pantones: colors.pantones,
  },
  typography: {
    fontFamily: "Hanken Grotesk, sans-serif",
    // H1 Typography variants
    h1Bold: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "48px",
      fontWeight: 800,
      lineHeight: 1.2,
    },
    h1Regular: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "48px",
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h1Light: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "48px",
      fontWeight: 300,
      lineHeight: 1.2,
    },
    // H2 Typography variants
    h2Bold: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "39px",
      fontWeight: 800,
      lineHeight: 1.3,
    },
    h2Regular: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "39px",
      fontWeight: 400,
      lineHeight: 1.3,
    },
    h2Light: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "39px",
      fontWeight: 300,
      lineHeight: 1.3,
    },
    // H3 Typography variants
    h3Bold: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "31px",
      fontWeight: 800,
      lineHeight: 1.4,
    },
    h3Regular: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "31px",
      fontWeight: 400,
      lineHeight: 1.4,
    },
    h3Light: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "31px",
      fontWeight: 300,
      lineHeight: 1.4,
    },
    // H4 Typography variants
    h4Bold: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "25px",
      fontWeight: 800,
      lineHeight: 1.4,
    },
    h4Regular: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "25px",
      fontWeight: 400,
      lineHeight: 1.4,
    },
    h4Light: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "25px",
      fontWeight: 300,
      lineHeight: 1.4,
    },
    // Headline Typography variants
    headlineBold: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "20px",
      fontWeight: 800,
      lineHeight: 1.5,
    },
    headlineRegular: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "20px",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    headlineLight: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "20px",
      fontWeight: 300,
      lineHeight: 1.5,
    },
    // Body Typography variants
    bodyBold: {
      fontFamily: "Hanken Grotesk, sans-serif",
      fontSize: "16px",
      fontWeight: 800,
      lineHeight: 1.6,
    },
    bodyRegular: {
      fontFamily: "Hanken Grotesk, sans-serif",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    bodyLight: {
      fontFamily: "Hanken Grotesk, sans-serif",
      fontSize: "16px",
      fontWeight: 300,
      lineHeight: 1.6,
    },
    // Subtitle Typography variants
    subtitleBold: {
      fontFamily: "Hanken Grotesk, sans-serif",
      fontSize: "13px",
      fontWeight: 800,
      lineHeight: 1.6,
    },
    subtitleRegular: {
      fontFamily: "Hanken Grotesk, sans-serif",
      fontSize: "13px",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    subtitleLight: {
      fontFamily: "Hanken Grotesk, sans-serif",
      fontSize: "13px",
      fontWeight: 300,
      lineHeight: 1.6,
    },
    captionBold: {
      fontFamily: "Hanken Grotesk, sans-serif",
      fontSize: "10px",
      fontWeight: 800,
    },
    captionRegular: {
      fontFamily: "Hanken Grotesk, sans-serif",
      fontSize: "10px",
      fontWeight: 400,
    },
    captionLight: {
      fontFamily: "Hanken Grotesk, sans-serif",
      fontSize: "10px",
      fontWeight: 300,
    },
    // Default MUI typography overrides
    h1: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "48px",
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "39px",
      fontWeight: 400,
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "31px",
      fontWeight: 400,
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "25px",
      fontWeight: 400,
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "20px",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    h6: {
      fontFamily: "Noto Serif Display, serif",
      fontSize: "20px",
      fontWeight: 300,
      lineHeight: 1.6,
    },
    body1: {
      fontFamily: "Hanken Grotesk, sans-serif",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: "Hanken Grotesk, sans-serif",
      fontSize: "13px",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    button: {
      fontFamily: "Hanken Grotesk, sans-serif",
      fontSize: "16px",
      fontWeight: 300,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 999,
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          ...buttonStyles.common,
          "&.MuiButton-containedPrimary": {
            backgroundColor: colorProfiles.whites.main,
            color: colorProfiles.blacks.main,
            border: "none",
            "&:hover": {
              backgroundColor: colorProfiles.pantones.main,
              color: colorProfiles.whites.main,
            },
            "&:active": {
              backgroundColor: colorProfiles.pantones.dark,
              color: colorProfiles.blacks.main,
              border: `1px solid ${colorProfiles.blacks.main}`,
            },
            "&.Mui-disabled": {
              backgroundColor: colorProfiles.greys.dark,
              color: colorProfiles.blacks.light,
              opacity: 0.3,
            },
          },
          "&.MuiButton-outlinedPrimary": {
            backgroundColor: colorProfiles.blacks.dark,
            color: colorProfiles.whites.main,
            border: `1px solid ${colorProfiles.whites.main}`,
            "&:hover": {
              backgroundColor: colorProfiles.pantones.main,
              color: colorProfiles.whites.main,
              border: `1px solid ${colorProfiles.whites.main}`,
            },
            "&:active": {
              backgroundColor: colorProfiles.pantones.dark,
              color: colorProfiles.whites.main,
              border: `1px solid ${colorProfiles.whites.main}`,
            },
            "&.Mui-disabled": {
              backgroundColor: colorProfiles.greys.dark,
              color: colorProfiles.blacks.light,
              border: `1px solid ${colorProfiles.greys.dark}`,
              opacity: 0.3,
            },
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          color: colorProfiles.blacks.light,
        },
      },
    },
  },
};

// Create light theme
export const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    ...baseThemeOptions.palette,
    mode: "light",
    background: {
      default: colorProfiles.whites.main,
      paper: colorProfiles.whites.light,
    },
    text: {
      primary: colorProfiles.blacks.main,
      secondary: colorProfiles.blacks.light,
    },
  },
});

// Create dark theme
export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    ...baseThemeOptions.palette,
    mode: "dark",
    background: {
      default: colorProfiles.blacks.main,
      paper: colorProfiles.blacks.dark,
    },
    text: {
      primary: colorProfiles.whites.main,
      secondary: colorProfiles.whites.dark,
    },
  },
  components: {
    ...baseThemeOptions.components,
    MuiButton: {
      styleOverrides: {
        root: {
          ...buttonStyles.common,
          "&.MuiButton-containedPrimary": {
            backgroundColor: colorProfiles.blacks.main,
            color: colorProfiles.whites.main,
            border: "none",
            "&:hover": {
              backgroundColor: colorProfiles.pantones.main,
              color: colorProfiles.whites.main,
            },
            "&:active": {
              backgroundColor: colorProfiles.pantones.dark,
              color: colorProfiles.whites.main,
            },
            "&.Mui-disabled": {
              backgroundColor: colorProfiles.greys.dark,
              color: colorProfiles.blacks.light,
              opacity: 0.3,
            },
          },
          "&.MuiButton-outlinedPrimary": {
            backgroundColor: colorProfiles.blacks.dark,
            color: colorProfiles.whites.main,
            border: `1px solid ${colorProfiles.whites.main}`,
            "&:hover": {
              backgroundColor: colorProfiles.pantones.main,
              color: colorProfiles.whites.main,
              border: `1px solid ${colorProfiles.whites.main}`,
            },
            "&:active": {
              backgroundColor: colorProfiles.pantones.dark,
              color: colorProfiles.whites.main,
              border: `1px solid ${colorProfiles.whites.main}`,
            },
            "&.Mui-disabled": {
              backgroundColor: colorProfiles.greys.dark,
              color: colorProfiles.blacks.light,
              border: `1px solid ${colorProfiles.greys.dark}`,
              opacity: 0.3,
            },
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "16px",
          color: colorProfiles.whites.light,
        },
      },
    },
  },
});

// Default theme (light theme)
export const theme = lightTheme;

// Export color profiles for use in components
export { colorProfiles };
