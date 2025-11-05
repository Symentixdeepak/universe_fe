import React from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  styled,
} from "@mui/material";
import { useThemeColors } from "@/hooks";

interface ButtonGroupOption {
  value: string;
  label: string;
}

interface ButtonGroupProps {
  options: ButtonGroupOption[];
  value: string;
  onChange: (value: string) => void;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  position: "relative",
  borderRadius: "25px",
  backgroundColor: "#F5F5F5", // Background container
  border: "none",
  padding: "4px",
  "& .MuiToggleButtonGroup-grouped": {
    border: "none !important",
    borderRadius: "25px !important",
    margin: 0,
    position: "relative",
    zIndex: 1,
    transition: "all 0.3s ease",
    "&:not(:first-of-type)": {
      marginLeft: "-20px", // Overlap effect
    },
    "&.Mui-selected": {
      zIndex: 2, // Bring selected button to front
      transform: "scale(1.05)", // Slightly larger when selected
    },
  },
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: "25px !important",
  textTransform: "none",
  padding: "10px 40px",

  border: "none !important",
  boxShadow: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "none",
  },

  "&.Mui-selected": {
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    "&:hover": {},
  },
}));

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  options,
  value,
  onChange,
  size = "small",
  fullWidth = false,
}) => {
  const themeColors = useThemeColors();

  return (
    <StyledToggleButtonGroup
      value={value}
      exclusive
      onChange={(event, newValue) => {
        if (newValue !== null) {
          onChange(newValue);
        }
      }}
      sx={{
        width: fullWidth ? "100%" : "auto",
        backgroundColor: themeColors.white.dark,
      }}
    >
      {options.map((option, index) => {
        const isSelected = value === option.value;
        return (
          <StyledToggleButton
            key={option.value}
            value={option.value}
            size={size}
            sx={{
              flex: fullWidth ? 1 : "none",
              backgroundColor: isSelected
                ? themeColors.pantone.main
                : "transparent",
              height: { xs: 37, md: 41 },
              color: isSelected
                ? themeColors.white.main
                : themeColors.text.primary,
              "&:hover": {},
              "&.Mui-selected": {
                backgroundColor: `${themeColors.pantone.main} !important`,
                color: `${themeColors.white.main} !important`,
                "&:hover": {
                  backgroundColor: `${themeColors.pantone.main} !important`,
                },
              },
              // Add overlap effect
              ...(index > 0 && {
                marginLeft: "-20px",
              }),
              // Ensure selected button appears on top
              zIndex: isSelected ? 2 : 1,
            }}
          >
            <Typography
              variant={isSelected ? "bodyRegular" : "bodyLight"}
              sx={{
                position: "relative",
                zIndex: 1,
              }}
            >
              {option.label}
            </Typography>
          </StyledToggleButton>
        );
      })}
    </StyledToggleButtonGroup>
  );
};

export default ButtonGroup;
