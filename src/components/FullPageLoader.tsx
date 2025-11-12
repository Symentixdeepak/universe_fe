import React from "react";
import { Box, CircularProgress, Typography, Backdrop } from "@mui/material";
import { useThemeColors } from "@/hooks";

interface FullPageLoaderProps {
  open: boolean;
  message?: string;
}

export const FullPageLoader: React.FC<FullPageLoaderProps> = ({
  open,
  message = "Loading...",
}) => {
  const themeColors = useThemeColors();

  return (
    <Backdrop
      open={open}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.modal + 1000, // Very high z-index to cover everything
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <CircularProgress
          size={40}
          thickness={3}
          sx={{
            color: themeColors.pantone.main,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            color: themeColors.white.main,
            fontWeight: 500,
          }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default FullPageLoader;
