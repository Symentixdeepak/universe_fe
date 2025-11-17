import React, { useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  Box,
  Typography,
} from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useThemeColors } from "@/hooks/useThemeColors";

interface SelectInputProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder = "Choose an option",
}) => {
  const themeColors = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
      <Typography
        variant="bodyRegular"
        sx={{
          minWidth: "150px",
          color: "text.primary",
        }}
      >
        {label}
      </Typography>
      <FormControl fullWidth>
        <Select
          value={value}
          onChange={handleChange}
          onOpen={handleOpen}
          onClose={handleClose}
          displayEmpty
          IconComponent={() => (
            <Box
              sx={{
                marginRight: "12px",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              {isOpen ? (
                <KeyboardArrowUp
                  sx={{
                    fontSize: 13,
                    color: themeColors.pantone.main,
                  }}
                />
              ) : (
                <ArrowForwardIosOutlinedIcon
                  sx={{
                    fontSize: 10,
                    color: themeColors.grey.light,
                  }}
                />
              )}
            </Box>
          )}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: "5px",
                marginTop: "4px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                "& .MuiList-root": {
                  padding: 0,
                },
              },
            },
          }}
          sx={{
            height: "41px",
            width: { xs: "auto", md: 239 },
            borderRadius: "5px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: themeColors?.black.light,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: themeColors.pantone.main,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: themeColors.pantone.main,
            },
            "&:hover": {
              "& .MuiSvgIcon-root": {
                color: themeColors.pantone.main,
              },
            },
          }}
        >
          <MenuItem value="" disabled>
            <Typography
              variant="bodyLight"
              sx={{ color: themeColors.grey.light }}
            >
              {placeholder}
            </Typography>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Typography variant="bodyRegular">{option}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectInput;
