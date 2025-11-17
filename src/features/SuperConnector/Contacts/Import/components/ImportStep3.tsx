import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ConnectingDots from "@/components/ConnectingDots";
import { useImportContext } from "../context/ImportContext";
import { useThemeColors } from "@/hooks";

const ImportStep3: React.FC = () => {
  const { handleNextStep } = useImportContext();
  const themeColors = useThemeColors();
    useEffect(() => {
      const timer = setTimeout(() => {
        handleNextStep();
      }, 3000);

      return () => clearTimeout(timer);
    }, [handleNextStep]);

  return (
    <Box
      sx={{
        m: "auto",
      }}
    >
      <Box mb={0.5}>
        <ConnectingDots gap={2} color={themeColors.pantone.main} size={12} normalized />
      </Box>
      <Typography
        variant="bodyRegular"
        sx={{
          color: themeColors.grey.light,
          textAlign: "center",
        }}
      >
        Please wait while the Universe recognizes your contacts
      </Typography>
    </Box>
  );
};

export default ImportStep3;
