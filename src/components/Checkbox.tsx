import React, { useState } from "react";
import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
  CheckboxProps as MuiCheckboxProps,
  styled,
} from "@mui/material";
import { useThemeColors } from "@/hooks";

// Theme type - now auto-detected
type CheckboxTheme = "auto" | "white" | "black";

interface CustomCheckboxProps extends Omit<MuiCheckboxProps, "color"> {
  theme?: CheckboxTheme;
  label?: string;
  customSx?: object;
}

// Custom Unchecked SVG
const UncheckedIcon = ({ borderColor }: { borderColor: string }) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    style={{ borderRadius: "3px", display: "block" }}
  >
    <rect
      width="20"
      height="20"
      x="0.5"
      y="0.5"
      rx="2.5"
      fill="transparent"
      stroke={borderColor}
      strokeWidth="1"
      style={{ transition: "stroke 300ms ease-out" }}
    />
  </svg>
);

// Custom Checked SVG
const CheckedIcon = ({
  borderColor,
  fillColor,
}: {
  borderColor: string;
  fillColor: string;
}) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    style={{ borderRadius: "3px", display: "block" }}
  >
    <rect
      width="21"
      height="21"
      rx="3"
      fill={fillColor}
      stroke={borderColor}
      strokeWidth="1"
      style={{ transition: "stroke 300ms ease-out, fill 300ms ease-out" }}
    />
  </svg>
);

// Color logic - now theme-aware
const getCheckboxColors = (
  themeColors: ReturnType<typeof useThemeColors>,
  requestedTheme: CheckboxTheme,
  checked: boolean,
  hovered: boolean,
  active: boolean,
  disabled: boolean
) => {
  // If disabled, return muted colors regardless of state
  if (disabled) {
    return {
      borderColor: "#d0d0d0",
      fillColor: checked ? "#d0d0d0" : "transparent",
      labelColor: "#a0a0a0",
    };
  }

  // Determine effective theme
  const effectiveTheme =
    requestedTheme === "auto" ? themeColors.getCheckboxTheme() : requestedTheme;

  if (effectiveTheme === "black") {
    // Light background scheme
    if (checked)
      return {
        borderColor: themeColors.border.primary,
        fillColor: themeColors.pantone.main,
        labelColor: themeColors.text.primary,
      };
    if (active)
      return {
        borderColor: themeColors.pantone.dark,
        fillColor: "transparent",
        labelColor: themeColors.pantone.dark,
      };
    if (hovered)
      return {
        borderColor: themeColors.pantone.main,
        fillColor: "transparent",
        labelColor: themeColors.pantone.main,
      };
    return {
      borderColor: themeColors.border.primary,
      fillColor: "transparent",
      labelColor: themeColors.text.primary,
    };
  } else {
    // Dark background scheme
    if (checked)
      return {
        borderColor: themeColors.white.main,
        fillColor: themeColors.pantone.main,
        labelColor: themeColors.white.main,
      };
    if (active)
      return {
        borderColor: themeColors.pantone.dark,
        fillColor: "transparent",
        labelColor: themeColors.pantone.dark,
      };
    if (hovered)
      return {
        borderColor: themeColors.pantone.main,
        fillColor: "transparent",
        labelColor: themeColors.pantone.main,
      };
    return {
      borderColor: themeColors.white.main,
      fillColor: "transparent",
      labelColor: themeColors.white.main,
    };
  }
};

const StyledCheckbox = styled(MuiCheckbox, {
  shouldForwardProp: (prop) => prop !== "customSx",
})({
  padding: 0,
  width: "21px",
  height: "21px",
  marginTop: "2px",
  borderRadius: "3px",
  transition: "all 300ms ease-out",
  "& .MuiSvgIcon-root": {
    width: "21px",
    height: "21px",
    borderRadius: "3px",
    transition: "all 300ms ease-out",
    background: "transparent",
  },
  boxShadow: "none",
});

const StyledFormControlLabel = styled(FormControlLabel, {
  shouldForwardProp: (prop) => prop !== "customSx",
})({
  margin: 0,
  alignItems: "flex-start",
  gap: "8px",

  fontSize: "16px",
  fontFamily: "Hanken Grotesk, sans-serif",
  fontWeight: 300,
  transition: "all 300ms ease-out",
  "& .MuiFormControlLabel-label": {
    transition: "color 300ms ease-out",
    userSelect: "none",
    cursor: "pointer",
  },
});

// Main Checkbox component
const Checkbox: React.FC<CustomCheckboxProps> = ({
  theme: checkboxTheme = "auto",
  label,
  customSx = {},
  checked,
  onChange,
  ...props
}) => {
  const themeColors = useThemeColors();
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [internalChecked, setInternalChecked] = useState(checked ?? false);

  // Support for controlled/uncontrolled
  const isChecked = checked !== undefined ? checked : internalChecked;

  // Compute colors each render
  const { borderColor, fillColor, labelColor } = getCheckboxColors(
    themeColors,
    checkboxTheme,
    isChecked,
    isHovered,
    isActive,
    props.disabled || false
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: boolean
  ) => {
    if (checked === undefined) setInternalChecked(value);
    onChange?.(event, value);
  };

  const handleMouseEnter = () => {
    if (!props.disabled) setIsHovered(true);
  };
  const handleMouseLeave = () => {
    if (!props.disabled) {
      setIsHovered(false);
      setIsActive(false);
    }
  };
  const handleMouseDown = () => {
    if (!props.disabled) setIsActive(true);
  };
  const handleMouseUp = () => {
    if (!props.disabled) setIsActive(false);
  };

  const checkbox = (
    <StyledCheckbox
      checked={isChecked}
      onChange={handleChange}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      icon={<UncheckedIcon borderColor={borderColor} />}
      checkedIcon={
        <CheckedIcon borderColor={borderColor} fillColor={fillColor} />
      }
      sx={customSx}
      {...props}
    />
  );

  if (!label) return checkbox;

  return (
    <StyledFormControlLabel
      control={checkbox}
      label={label}
      sx={{
        "& .MuiFormControlLabel-label": {
          color: labelColor,
          transition: "color 300ms ease-out",
          cursor: props.disabled ? "default" : "pointer",
        },
        cursor: props.disabled ? "default" : "pointer",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    />
  );
};

export default Checkbox;
export type { CustomCheckboxProps, CheckboxTheme };
