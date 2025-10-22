import React, { useState } from "react";
import {
  Box,
  FormControlLabel,
  Radio as MuiRadio,
  RadioProps as MuiRadioProps,
  styled,
  Typography,
} from "@mui/material";
import { useThemeColors } from "@/hooks";
import { theme } from "@/styles/theme";

interface CustomRadioProps extends Omit<MuiRadioProps, "size"> {
  label: string;
  selected?: boolean;
  onSelect?: () => void;
  disabled?: boolean;
}

// Custom styled radio button container
const StyledRadioContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    ![
      "themeColors",
      "isSelected",
      "isHovered",
      "isClicked",
      "isDisabled",
    ].includes(prop as string),
})<{
  themeColors: ReturnType<typeof useThemeColors>;
  isSelected: boolean;
  isHovered: boolean;
  isClicked: boolean;
  isDisabled: boolean;
}>(({ theme, themeColors, isSelected, isHovered, isClicked, isDisabled }) => {
  const isDark = theme.palette.mode === "dark";

  // Determine styles based on state and theme
  let textColor,
    radioOutlineColor,
    inputBorderColor,
    inputBgColor,
    radioBgColor;

  if (isDisabled) {
    // Disabled state (same for both themes)
    textColor = themeColors.grey.dark;
    radioOutlineColor = themeColors.grey.dark;
    inputBorderColor = themeColors.grey.dark;
    inputBgColor = isDark ? themeColors.text.primary : themeColors.text.primary; // black main for both
    radioBgColor = themeColors.grey.dark;
  } else if (isSelected) {
    if (isDark) {
      // Dark theme selected
      textColor = themeColors.text.primary; // white main
      radioOutlineColor = themeColors.text.primary; // white main
      inputBorderColor = themeColors.text.primary; // white main
      inputBgColor = themeColors.background.primary; // black main
      radioBgColor = themeColors.pantone.main;
    } else {
      // Light theme selected
      textColor = themeColors.text.primary; // black main
      radioOutlineColor = themeColors.text.primary; // black main
      inputBorderColor = themeColors.text.primary; // black main
      inputBgColor = themeColors.background.primary; // white main
      radioBgColor = themeColors.pantone.main;
    }
  } else if (isClicked) {
    // Clicked state (same for both themes)
    textColor = themeColors.text.primary; // white main
    radioOutlineColor = themeColors.white.main; // white main
    inputBorderColor = themeColors.text.primary; // white main
    inputBgColor = themeColors.pantone.dark;
    radioBgColor = themeColors.pantone.dark;
  } else if (isHovered) {
    // Hover state (same for both themes)
    textColor = themeColors.white.main; // white main
    radioOutlineColor =  themeColors.white.main; // white main
    inputBorderColor = themeColors.text.primary; // white main
    inputBgColor = themeColors.pantone.main;
    radioBgColor = themeColors.pantone.main;
  } else {
    // Default state
    if (isDark) {
      // Dark theme default
      textColor = themeColors.text.primary; // white main
      radioOutlineColor = themeColors.text.primary; // white main
      inputBorderColor = themeColors.text.primary; // white main
      inputBgColor = themeColors.background.primary; // black main
      radioBgColor = themeColors.background.primary; // black main
    } else {
      // Light theme default
      textColor = themeColors.text.primary; // black main
      radioOutlineColor = themeColors.text.primary; // black main
      inputBorderColor = themeColors.text.primary; // black main
      inputBgColor = themeColors.background.primary; // white main
      radioBgColor = themeColors.background.primary; // white main
    }
  }

  return {
    height: 41,
    maxWidth: 341,
    width: "100%",
    border: `1px solid ${inputBorderColor}`,
    borderRadius: "999px",
    padding: "10px",
    backgroundColor: inputBgColor,
    display: "flex",
    alignItems: "center",
    cursor: isDisabled ? "not-allowed" : "pointer",
    transition: "all 300ms ease-out",

    "& .MuiFormControlLabel-root": {
      margin: 0,
      width: "100%",

      "& .MuiFormControlLabel-label": {
        color: textColor,
        fontSize: "14px",
        fontWeight: 400,
        transition: "color 300ms ease-out",
      },

      "& .MuiRadio-root": {
        padding: "0 8px 0 0",
        color: radioOutlineColor,

        "& .MuiSvgIcon-root": {
          fontSize: 20,
        },
        "&.Mui-checked .MuiSvgIcon-root": {
          color: radioOutlineColor,

          "& circle": {
            color: radioBgColor,
          },
        },

        "&.Mui-disabled": {
          color: themeColors.grey.dark,
        },
      },
    },
  };
});

const Radio: React.FC<CustomRadioProps> = ({
  label,
  selected = false,
  onSelect,
  disabled = false,
  ...props
}) => {
  const themeColors = useThemeColors();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsClicked(false);
  };

  const handleMouseDown = () => {
    if (!disabled) {
      setIsClicked(true);
    }
  };

  const handleMouseUp = () => {
    setIsClicked(false);
  };

  const handleClick = () => {
    if (!disabled && onSelect) {
      onSelect();
    }
  };
  const CheckedIcon = () => (
    <svg width="20" height="20">
      <circle
        cx="10"
        cy="10"
        r="9"
        stroke={isHovered && !selected ? themeColors.white.main : themeColors.isDark ? themeColors.white.main : themeColors.black.main}
        fill="transparent"
        strokeWidth="1"
      />
      <circle cx="10" cy="10" r="8.5" fill={selected ? themeColors.pantone.main : "transparent"}/>
    </svg>
  );

  const UnchekedIcon = () => (
    <svg width="20" height="20">
      <circle
        cx="10"
        cy="10"
        r="9"
        stroke={isHovered  && !selected? themeColors.white.main : themeColors.isDark ? themeColors.white.main : themeColors.black.main}
        fill="transparent"
        strokeWidth="1"
      />
      <circle cx="10" cy="10" r="8.5" fill={selected ? themeColors.pantone.main : "transparent"}/>
    </svg>
  );

  return (
    <StyledRadioContainer
      themeColors={themeColors}
      isSelected={selected}
      isHovered={isHovered}
      isClicked={isClicked}
      isDisabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      <FormControlLabel
        control={
          <MuiRadio
            checked={selected}
            disabled={disabled}
            icon={<UnchekedIcon />}
            checkedIcon={selected ? <CheckedIcon /> : <UnchekedIcon />}
            {...props}
          />
        }
        label={label}
      />
    </StyledRadioContainer>
  );
};

export default Radio;
