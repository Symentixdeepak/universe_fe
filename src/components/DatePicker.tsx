import React from "react";
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField as MuiTextField, styled, Box } from "@mui/material";
import { useThemeColors } from "@/hooks";
import dayjs, { Dayjs } from "dayjs";

// Define custom variant types
type DatePickerVariant = "outlined" | "filled" | "standard";
type DatePickerTheme = "auto" | "light" | "dark";

// Extend MUI DatePicker props
interface CustomDatePickerProps
  extends Omit<MuiDatePickerProps<Dayjs>, "slots"> {
  variant?: DatePickerVariant;
  customSx?: object;
  theme?: DatePickerTheme;
  showCalendarIcon?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
}

// Theme-aware styled TextField
const StyledTextField = styled(MuiTextField, {
  shouldForwardProp: (prop) =>
    !["themeColors", "fieldTheme"].includes(prop as string),
})<{
  themeColors: ReturnType<typeof useThemeColors>;
  fieldTheme: DatePickerTheme;
}>(({ theme, themeColors, fieldTheme }) => {
  const useDarkStyling =
    fieldTheme === "auto" ? themeColors.isDark : fieldTheme === "dark";

  const textColor = useDarkStyling
    ? themeColors.white.main
    : themeColors.text.primary;
  const borderColor = useDarkStyling
    ? themeColors.white.main
    : themeColors.border.primary;
  const hoverBorderColor = useDarkStyling
    ? themeColors.pantone.main
    : themeColors.pantone.main;
  const focusBorderColor = useDarkStyling
    ? themeColors.pantone.main
    : themeColors.pantone.main;
  const placeholderColor = useDarkStyling ? themeColors.grey.dark : themeColors.grey.light;
  const backgroundColor = themeColors.background.secondary;

  return {
    "& .MuiOutlinedInput-root": {
      height: "41px",
      ...theme.typography.bodyLight,
      "& fieldset": {
        border: `1px solid ${borderColor}`,
        borderRadius: "999px",
        transition: "all 300ms ease-out",
      },
      "&:hover fieldset": {
        border: `1px solid ${hoverBorderColor}`,
      },
      "&.Mui-focused fieldset": {
        border: `2px solid ${focusBorderColor}`,
      },
      "& input": {
        padding: "8px 16px",
        color: textColor,
        transition: "color 300ms ease-out",
        cursor: "pointer",
        "&::placeholder": {
          color: placeholderColor,
          opacity: 1,
        },
      },
    },
    "& .MuiFilledInput-root": {
      height: "41px",
      ...theme.typography.bodyLight,
      backgroundColor: backgroundColor,
      border: `1px solid ${borderColor}`,
      borderRadius: "999px",
      transition: "all 300ms ease-out",
      "&:hover": {
        backgroundColor: backgroundColor,
        border: `1px solid ${hoverBorderColor}`,
      },
      "&.Mui-focused": {
        backgroundColor: backgroundColor,
        border: `2px solid ${focusBorderColor}`,
      },
      "& input": {
        padding: "8px 16px",
        color: textColor,
        cursor: "pointer",
        "&::placeholder": {
          color: placeholderColor,
          opacity: 1,
        },
      },
      "&:before, &:after": {
        display: "none",
      },
    },
    "& .MuiInput-root": {
      ...theme.typography.bodyLight,
      "&:before": {
        borderBottom: `1px solid ${borderColor}`,
        transition: "border-bottom 300ms ease-out",
      },
      "&:hover:not(.Mui-disabled):before": {
        borderBottom: `1px solid ${hoverBorderColor}`,
      },
      "&:after": {
        borderBottom: `2px solid ${focusBorderColor}`,
      },
      "& input": {
        padding: "4px 16px",
        color: textColor,
        cursor: "pointer",
        "&::placeholder": {
          color: placeholderColor,
          opacity: 1,
        },
      },
    },
    "& .MuiInputLabel-root": {
      color: placeholderColor,
      transition: "color 300ms ease-out",
      "&.Mui-focused": {
        color: focusBorderColor,
      },
    },
  };
});

// Calendar icon
const CalendarIcon = ({
  themeColors,
}: {
  themeColors: ReturnType<typeof useThemeColors>;
}) => (
  <Box
    sx={{
      width: 20,
      height: 20,
      cursor: "pointer",
      filter: themeColors.isDark ? "invert(1)" : "none",
    }}
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H12V15H7V10Z"
        fill="currentColor"
      />
    </svg>
  </Box>
);

const DatePicker: React.FC<CustomDatePickerProps> = ({
  variant = "outlined",
  customSx = {},
  theme: fieldTheme = "auto",
  showCalendarIcon = false,
  placeholder = "DD/MM/YYYY",
  fullWidth = false,
  value,
  onChange,
  ...props
}) => {
  const themeColors = useThemeColors();
  const [open, setOpen] = React.useState(false); // 👈 controlled open state

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        value={value}
        onChange={onChange}
        format="DD/MM/YYYY"
        enableAccessibleFieldDOMStructure={false}
        slots={{
          textField: StyledTextField,
          openPickerIcon: showCalendarIcon ? CalendarIcon : () => null,
        }}
        slotProps={{
          textField: {
            variant,
            themeColors,
            fieldTheme,
            placeholder,
            fullWidth,
            inputProps: { readOnly: true },
            onClick: () => setOpen(true),
            sx: {
              ...customSx,
              "& .MuiOutlinedInput-root": { cursor: "pointer" },
              "& input": { cursor: "pointer" },
            },
          } as any,
          openPickerIcon: {
            themeColors,
          } as any,
          popper: {
            placement: "bottom-start", // 👈 always below input
            modifiers: [
              {
                name: "flip",
                enabled: false, // prevent auto flip
              },
            ],
            sx: {
              // 👇 override circular 999px radius
              "& .MuiPaper-root": {
                borderRadius: "12px !important",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                overflow: "hidden",
              },
              "& .MuiPickersDay-root.Mui-selected": {
                borderRadius: "8px", // no circle, rectangular highlight
                backgroundColor: themeColors.pantone.main,
                color: "#fff",
              },
              "& .MuiPickersDay-root.Mui-selected:hover": {
                backgroundColor: themeColors.pantone.dark,
              },
            },
          },
        }}
        {...props}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
export type { CustomDatePickerProps, DatePickerVariant, DatePickerTheme };
