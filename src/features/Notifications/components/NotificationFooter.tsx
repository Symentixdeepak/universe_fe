import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useThemeColors } from "@/hooks";

interface NotificationFooterProps {
  totalConnections: number;
  onClearAll?: () => void;
  onPassiveConnectionsClick?: () => void;
  passivePanelOpen: boolean;
}

export const NotificationFooter: React.FC<NotificationFooterProps> = ({
  totalConnections,
  onClearAll,
  passivePanelOpen,
  onPassiveConnectionsClick,
}) => {
  const themeColors = useThemeColors();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 2,
      }}
    >
      <Typography
        variant="bodyLight"
        sx={{
          color: themeColors.grey.main,
          textAlign: "center",
          cursor: "pointer",
          textDecoration: "underline",
          mb: 2,
        }}
        onClick={onClearAll}
      >
        {" "}
        Clear Notifications
      </Typography>

      <Typography
        variant="bodyRegular"
        sx={{
          color: passivePanelOpen
            ? themeColors.pantone.main
            : themeColors.grey.main,
          textAlign: "center",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={onPassiveConnectionsClick}
      >
        Your Passive Daily Connections ({totalConnections}/7)
      </Typography>
    </Box>
  );
};

export default NotificationFooter;
