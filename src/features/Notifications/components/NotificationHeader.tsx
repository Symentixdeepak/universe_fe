import React from "react";
import { Box, Typography, InputAdornment } from "@mui/material";
import { SvgIcon, TextField } from "@/components";
import { useThemeColors } from "@/hooks";

interface NotificationHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  searchValue,
  onSearchChange,
}) => {
  const themeColors = useThemeColors();

  return (
    <Box
      sx={{
        borderTopRightRadius: "20px",
      }}
    >
      <TextField
        fullWidth
        placeholder="Search"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon name="search_nav" width={20} height={20} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      />
    </Box>
  );
};

export default NotificationHeader;
