import React from "react";
import { Box, Typography } from "@mui/material";
import { useThemeColors } from "@/hooks";

const ImportStep5: React.FC = () => {
  const { pantone, grey } = useThemeColors();

  return (
    <Box
      sx={{
        m: "auto",
      }}
    >
      <Typography
        variant="bodyRegular"
        sx={{
          color: grey.light,
          textAlign: "center",
        }}
      >
        Import{" "}
        <Typography variant="bodyRegular" style={{ color: pantone.main }}>
          Successful!
        </Typography>
      </Typography>
    </Box>
  );
};

export default ImportStep5;
