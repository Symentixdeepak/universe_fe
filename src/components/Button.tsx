import React, { useState } from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
  styled,
  Box,
} from "@mui/material";
import { useThemeColors } from "@/hooks";

// Define button theme variants
type ButtonTheme = "auto" | "black" | "white" | "pantone";
type ButtonVariant = "contained" | "outlined";

// Custom props interface
interface CustomButtonProps extends Omit<MuiButtonProps, "color" | "variant"> {
  theme?: ButtonTheme;
  variant?: ButtonVariant;
  selected?: boolean;
  customSx?: object;
  loading?: boolean; // 👈 New prop
  loadingText?: string; // 👈 Optional text during loading
}

// Helper function to get button styles based on theme and state
const getButtonStyles = (
  themeColors: ReturnType<typeof useThemeColors>,
  buttonTheme: ButtonTheme,
  buttonVariant: ButtonVariant,
  isSelected: boolean,
  isHovered: boolean,
  isActive: boolean,
  disabled?: boolean
) => {
  const effectiveTheme =
    buttonTheme === "auto"
      ? themeColors.isDark
        ? "white"
        : "black"
      : buttonTheme === "black" && themeColors.isDark
      ? "white"
      : buttonTheme === "white" && themeColors.isDark
      ? "black"
      : buttonTheme;

  const baseStyles = {
    fontFamily: "Hanken Grotesk, sans-serif",
    fontSize: "16px",
    fontWeight: 300,
    borderRadius: "999px",
    padding: "10px 40px",
    textTransform: "none" as const,
    transition: "all 300ms ease-out",
    height: "41px",
    border: "1px solid transparent",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };

  // 🖤 Black theme
  if (effectiveTheme === "black") {
    if (buttonVariant === "contained") {
      if (isSelected)
        return {
          ...baseStyles,
          backgroundColor: themeColors.text.primary,
          color: themeColors.background.primary,
          border: `1px solid ${themeColors.background.primary}`,
        };
      if (isActive)
        return {
          ...baseStyles,
          backgroundColor: themeColors.pantone.dark,
          color: themeColors.background.primary,
          border: `1px solid ${themeColors.pantone.dark}`,
        };
      if (isHovered)
        return {
          ...baseStyles,
          backgroundColor: themeColors.pantone.main,
          color: themeColors.background.primary,
        };
      if (disabled)
        return {
          ...baseStyles,
          backgroundColor: themeColors.grey.dark,
          color: `${themeColors.black.dark} !important`,
        };
      return {
        ...baseStyles,
        backgroundColor: themeColors.text.primary,
        color: themeColors.background.primary,
      };
    } else {
      if (isSelected)
        return {
          ...baseStyles,
          backgroundColor: "transparent",
          color: themeColors.pantone.light,
          border: `1px solid ${themeColors.pantone.light}`,
        };
      if (isActive)
        return {
          ...baseStyles,
          backgroundColor: themeColors.pantone.dark,
          color: themeColors.background.primary,
          border: `1px solid ${themeColors.background.primary}`,
        };
      if (isHovered)
        return {
          ...baseStyles,
          backgroundColor: themeColors.pantone.main,
          color: themeColors.background.primary,
          border: `1px solid ${themeColors.background.primary}`,
        };
      return {
        ...baseStyles,
        backgroundColor: "transparent",
        color: themeColors.text.primary,
        border: `1px solid ${themeColors.text.primary}`,
      };
    }
  }

  // 🤍 White theme
  if (effectiveTheme === "white") {
    if (buttonVariant === "contained") {
      if (isSelected)
        return {
          ...baseStyles,
          backgroundColor: themeColors.background.primary,
          color: themeColors.text.primary,
          border: `1px solid ${themeColors.text.primary}`,
        };
      if (isActive)
        return {
          ...baseStyles,
          backgroundColor: themeColors.pantone.dark,
          color: themeColors.text.primary,
          border: `1px solid ${themeColors.text.primary}`,
        };
      if (isHovered)
        return {
          ...baseStyles,
          backgroundColor: themeColors.pantone.main,
          color: themeColors.white.main,
        };
      if (disabled)
        return {
          ...baseStyles,
          backgroundColor: themeColors.grey.dark,
          color: themeColors.black.light,
        };
      return {
        ...baseStyles,
        backgroundColor: themeColors.white.main,
        color: themeColors.black.main,
      };
    } else {
      if (isSelected)
        return {
          ...baseStyles,
          backgroundColor: "transparent",
          color: themeColors.pantone.light,
          border: `1px solid ${themeColors.pantone.light}`,
        };
      if (isActive)
        return {
          ...baseStyles,
          backgroundColor: themeColors.pantone.dark,
          color: themeColors.white.main,
          border: `1px solid ${themeColors.background.primary}`,
        };
      if (isHovered)
        return {
          ...baseStyles,
          backgroundColor: themeColors.pantone.dark,
          color: themeColors.white.main,
          border: `1px solid ${themeColors.background.primary}`,
        };
      return {
        ...baseStyles,
        backgroundColor: "transparent",
        color: themeColors.white.main,
        border: `1px solid ${themeColors.white.main}`,
      };
    }
  }

  // 🎨 Pantone theme
  if (effectiveTheme === "pantone") {
    if (buttonVariant === "contained") {
      if (isSelected)
        return {
          ...baseStyles,
          backgroundColor: themeColors.pantone.dark,
          color: themeColors.background.primary,
        };
      if (isActive)
        return {
          ...baseStyles,
          backgroundColor: themeColors.pantone.main,
          color: themeColors.background.primary,
          border: `1px solid ${themeColors.background.primary}`,
        };
      if (isHovered)
        return {
          ...baseStyles,
          backgroundColor: themeColors.pantone.light,
          color: themeColors.background.primary,
        };
      return {
        ...baseStyles,
        backgroundColor: themeColors.pantone.main,
        color: themeColors.background.primary,
      };
    } else {
      if (isSelected)
        return {
          ...baseStyles,
          backgroundColor: "transparent",
          color: themeColors.pantone.dark,
          border: `1px solid ${themeColors.pantone.dark}`,
        };
      if (isActive)
        return {
          ...baseStyles,
          backgroundColor: themeColors.pantone.dark,
          color: themeColors.background.primary,
          border: `1px solid ${themeColors.background.primary}`,
        };
      if (isHovered)
        return {
          ...baseStyles,
          backgroundColor: themeColors.pantone.main,
          color: themeColors.background.primary,
          border: `1px solid ${themeColors.background.primary}`,
        };
      return {
        ...baseStyles,
        backgroundColor: "transparent",
        color: themeColors.pantone.main,
        border: `1px solid ${themeColors.pantone.main}`,
      };
    }
  }

  return baseStyles;
};

// Styled button
const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => !["buttonStyles"].includes(prop as string),
})<{
  buttonStyles: any;
  disabled?: boolean;
}>(({ buttonStyles, disabled }) => ({
  ...buttonStyles,
  ...(disabled && {
    opacity: 0.3,
    pointerEvents: "none",
  }),
  position: "relative",
  overflow: "hidden",
}));


const Button: React.FC<CustomButtonProps> = ({
  theme: buttonTheme = "auto",
  variant: buttonVari54want = "contained",
  selected = false,
  customSx = {},
  disabled = false,
  loading = false,
  loadingText,
  children,
  onClick,
  ...props
}) => {
  const themeColors = useThemeColors();
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => !disabled && !loading && setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsActive(false);
  };
  const handleMouseDown = () => !disabled && !loading && setIsActive(true);
  const handleMouseUp = () => setIsActive(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) onClick(event);
  };

  const buttonStyles = getButtonStyles(
    themeColors,
    buttonTheme,
    buttonVari54want,
    selected,
    isHovered,
    isActive,
    disabled || loading
  );

  return (
    <StyledButton
      buttonStyles={buttonStyles}
      disabled={disabled || loading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      sx={customSx}
      {...props}
    >
      {loading ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CircularProgress
            size={20}
            thickness={4}
            sx={{ color: themeColors.text.primary }}
          />
          {loadingText && <span>{loadingText}</span>}
        </Box>
      ) : (
        children
      )}
    </StyledButton>
  );
};

export default Button;
export type { CustomButtonProps, ButtonTheme, ButtonVariant };
