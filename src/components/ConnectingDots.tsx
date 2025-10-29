import React from "react";
import { Box } from "@mui/material";
import { useThemeColors } from "@/hooks"; // assuming you use this custom hook

interface ConnectingDotsProps {
  top?: string | number;
  left?: string | number;
  position?: "absolute" | "relative" | "fixed";
}

const ConnectingDots: React.FC<ConnectingDotsProps> = ({
  top = "40%",
  left = "50%",
  position = "absolute",
}) => {
  const themeColors = useThemeColors();

  return (
    <Box
      sx={{
        position,
        left,
        top,
        transform: "translate(-50%, -50%)",
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Array.from({ length: 3 }).map((_, i) => {
        const isCenter = i === 1;
        return (
          <Box
            key={i}
            sx={{
              width: isCenter ? 10 : 7,
              height: isCenter ? 10 : 7,
              borderRadius: "50%",
              bgcolor: themeColors.pantone.light,
            }}
          />
        );
      })}
    </Box>
  );
};

export default ConnectingDots;
