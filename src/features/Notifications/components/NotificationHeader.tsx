import React from "react";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import { SvgIcon } from "@/components";
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
        padding: "20px 16px",
        borderBottom: `1px solid ${themeColors.grey.light}`,
        borderTopRightRadius: "20px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: themeColors.text.primary,
          fontWeight: 600,
          mb: 2,
        }}
      >
        Notifications
      </Typography>
      
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
