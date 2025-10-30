import React from "react";
import { Chip as MuiChip, ChipProps as MuiChipProps } from "@mui/material";
import { colorProfiles } from "@/styles/theme";

export interface ChipProps extends Omit<MuiChipProps, "variant"> {
  /**
   * The variant of the chip
   * @default 'outlined'
   */
  variant?: "filled" | "outlined";
  /**
   * The color theme of the chip
   * @default 'default'
   */
  colorTheme?: "default" | "pantone" | "black" | "white";
}

export const Chip: React.FC<ChipProps> = ({
  variant = "outlined",
  colorTheme = "default",
  sx,
  ...props
}) => {
  // Base styles that work for all variants
  const baseStyles = {
    fontSize: { xs: 10, md: 16 },
    fontFamily: "Hanken Grotesk, sans-serif",
    fontWeight: 300,
    borderRadius: "999px",
    height: { xs: "33px", md: "40px" },
    transition: "all 300ms ease-out",
    "& .MuiChip-label": {
      padding: "10px 20px 10px 20px",
    },
  };

  // Get color scheme based on colorTheme
  const getColorScheme = () => {
    switch (colorTheme) {
      case "pantone":
        return {
          main: colorProfiles.pantones.main,
          light: colorProfiles.pantones.light,
          contrast: colorProfiles.whites.main,
        };
      case "black":
        return {
          main: colorProfiles.blacks.main,
          light: colorProfiles.blacks.light,
          contrast: colorProfiles.whites.main,
        };
      case "white":
        return {
          main: colorProfiles.whites.main,
          light: colorProfiles.whites.light,
          contrast: colorProfiles.blacks.main,
        };
      default:
        return {
          main: colorProfiles.greys.main,
          light: colorProfiles.greys.light,
          contrast: colorProfiles.whites.main,
        };
    }
  };

  const colors = getColorScheme();

  // Build styles based on variant
  const chipStyles = {
    ...baseStyles,
    ...(variant === "filled"
      ? {
          backgroundColor: colors.main,
          color: colors.contrast,
          border: "none",
          "&:hover": {
            backgroundColor: `${colors.light} !important`,
            transform: "translateY(-1px)",
          },
        }
      : {
          backgroundColor: "transparent",
          color: colors.main,
          border: `1px solid ${colors.main}`,
          "&:hover": {
            backgroundColor: `${colorProfiles.pantones.main} !important`,
            color: `${colorProfiles.whites.main} !important`,
            transform: "translateY(-1px)",
          },
        }),
  };

  return (
    <MuiChip
      variant="outlined"
      sx={{
        ...chipStyles,
        ...sx,
        cursor: "pointer",
      }}
      {...props}
    />
  );
};
