import { useThemeColors } from "@/hooks";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const SharedMedia = ({ isMobile = false }) => {
  const themeColors = useThemeColors();

  const sampleimages = [
    "/assets/images/sample/sample-media-1.png",
    "/assets/images/sample/sample-media-2.png",
    "/assets/images/sample/sample-media-3.png",
    "/assets/images/sample/sample-media-4.png",
  ];
  return (
    <Box mt={isMobile ? 5 : -3}>
      <Typography variant="bodyBold" sx={{ color: themeColors.text.primary }}>
        Shared Media{" "}
      </Typography>

      <Box
        sx={{
          display: "flex",  
          rowGap: 0,
          columnGap: 0.8,
          flexWrap: { xs: "nowrap", md: "wrap" },
          mt: -0.5,
          overflowX: { xs: "auto", md: "visible" },
        }}
      >
        {sampleimages.map((image, index) => (
          <Box key={index} sx={{ mt: 2 }}>
            <Image
              height={80}
              width={80}
              style={{ borderRadius: "10px" }}
              src={image}
              alt={`Sample Image ${index + 1}`}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SharedMedia;
