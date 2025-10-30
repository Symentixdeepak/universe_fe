import React from 'react';
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  styled,
} from '@mui/material';
import { useThemeColors } from '@/hooks';

// Define custom variant types
type TextFieldVariant = 'outlined' | 'filled' | 'standard';
type TextFieldTheme = 'auto' | 'light' | 'dark';

// Extend MUI TextField props with custom variants and styling
interface CustomTextFieldProps extends Omit<MuiTextFieldProps, 'variant'> {
  variant?: TextFieldVariant;
  customSx?: object;
  theme?: TextFieldTheme;
}

// Theme-aware styled TextField component
const StyledTextField = styled(MuiTextField, {
  shouldForwardProp: (prop) => !['themeColors', 'fieldTheme'].includes(prop as string),
})<{ 
  themeColors: ReturnType<typeof useThemeColors>;
  fieldTheme: TextFieldTheme;
}>(({ theme, themeColors, fieldTheme }) => {
  // Determine if we should use dark styling
  const useDarkStyling = fieldTheme === 'auto' 
    ? themeColors.isDark 
    : fieldTheme === 'dark';

  const textColor = useDarkStyling ? themeColors.white.main : themeColors.text.primary;
  const borderColor = useDarkStyling ? themeColors.white.main : themeColors.border.primary;
  const hoverBorderColor = themeColors.pantone.main;
  const focusBorderColor =  themeColors.pantone.main;
  const placeholderColor = useDarkStyling ? themeColors.grey.dark : themeColors.grey.light;
  const backgroundColor = useDarkStyling ? themeColors.background.secondary : themeColors.background.secondary;

  return {
  '& .MuiOutlinedInput-root': {
    height: '41px',
    ...theme.typography.bodyLight,
    '& fieldset': {
      border: `1px solid ${borderColor}`,
      borderRadius: '999px',
      transition: 'all 300ms ease-out',
    },
    '&:hover fieldset': {
      border: `1px solid ${hoverBorderColor}`,
    },
    '&.Mui-focused fieldset': {
      border: `2px solid ${focusBorderColor}`,
    },
    '& input': {
      padding: '8px 16px',
      color: textColor,
      transition: 'color 300ms ease-out',

      // Responsive font sizes
      fontSize: '13px',
      [theme.breakpoints.up('md')]: {
        fontSize: '16px',
      },

      '&::placeholder': {
        color: placeholderColor,
        opacity: 1,
        fontSize: '13px',
        [theme.breakpoints.up('md')]: {
          fontSize: '16px',
        },
      },
    },
  },

  '& .MuiFilledInput-root': {
    height: '41px',
    ...theme.typography.bodyLight,
    backgroundColor: backgroundColor,
    border: `1px solid ${borderColor}`,
    borderRadius: '999px',
    transition: 'all 300ms ease-out',
    '&:hover': {
      backgroundColor: backgroundColor,
      border: `1px solid ${hoverBorderColor}`,
    },
    '&.Mui-focused': {
      backgroundColor: backgroundColor,
      border: `2px solid ${focusBorderColor}`,
    },
    '& input': {
      padding: '8px 16px',
      color: textColor,

      fontSize: '13px',
      [theme.breakpoints.up('md')]: {
        fontSize: '16px',
      },

      '&::placeholder': {
        color: placeholderColor,
        opacity: 1,
        fontSize: '13px',
        [theme.breakpoints.up('md')]: {
          fontSize: '16px',
        },
      },
    },
    '&:before, &:after': {
      display: 'none',
    },
  },

  '& .MuiInput-root': {
    ...theme.typography.bodyLight,
    '&:before': {
      borderBottom: `1px solid ${borderColor}`,
      transition: 'border-bottom 300ms ease-out',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: `1px solid ${hoverBorderColor}`,
    },
    '&:after': {
      borderBottom: `2px solid ${focusBorderColor}`,
    },
    '& input': {
      padding: '4px 16px',
      color: textColor,

      fontSize: '13px',
      [theme.breakpoints.up('md')]: {
        fontSize: '16px',
      },

      '&::placeholder': {
        color: placeholderColor,
        opacity: 1,
        fontSize: '13px',
        [theme.breakpoints.up('md')]: {
          fontSize: '16px',
        },
      },
    },
  },

  '& .MuiInputLabel-root': {
    color: placeholderColor,
    transition: 'color 300ms ease-out',
    '&.Mui-focused': {
      color: focusBorderColor,
    },
  },
};

});

const TextField: React.FC<CustomTextFieldProps> = ({
  variant = 'outlined',
  customSx = {},
  theme: fieldTheme = 'auto',
  ...props
}) => {
  const themeColors = useThemeColors();

  return (
    <StyledTextField
      variant={variant}
      themeColors={themeColors}
      fieldTheme={fieldTheme}
      sx={customSx}
      {...props}
    />
  );
};

export default TextField;

// Export types for use in other components
export type { CustomTextFieldProps, TextFieldVariant, TextFieldTheme };