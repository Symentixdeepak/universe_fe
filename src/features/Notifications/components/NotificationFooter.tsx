import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useThemeColors } from "@/hooks";

interface NotificationFooterProps {
  totalConnections: number;
  onClearAll?: () => void;
}

export const NotificationFooter: React.FC<NotificationFooterProps> = ({
  totalConnections,
  onClearAll,
}) => {
  const themeColors = useThemeColors();

  return (
    <Box
      sx={{
        padding: "16px",
        borderTop: `1px solid ${themeColors.grey.light}`,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderBottomRightRadius: "20px",
      }}
    >
      <Button
        fullWidth
        onClick={onClearAll}
        sx={{
          color: themeColors.text.secondary,
          textTransform: "none",
          "&:hover": {
            backgroundColor: themeColors.white.dark,
          },
        }}
      >
        Clear Notifications
      </Button>
      
      <Typography
        variant="captionLight"
        sx={{
          color: themeColors.text.secondary,
          textAlign: "center",
        }}
      >
        Your Passive Daily Connections ({totalConnections}/7)
      </Typography>
    </Box>
  );
};

export default NotificationFooter;
