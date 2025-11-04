import React from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useThemeColors } from "@/hooks";
import { Button } from "@/components";
const MutualConnection = ({ isMobile = false }) => {
  const themeColors = useThemeColors();

  return (
    <Box mt={3}>
      {!isMobile && (
        <>
          <Typography
            variant="bodyBold"
            sx={{ color: themeColors.text.primary }}
          >
            Mutual Connections
          </Typography>
          <Box sx={{ display: "flex", mt: 1, justifyContent: "space-between" }}>
            <AvatarGroup
              sx={{
                ["& .MuiAvatarGroup-avatar"]: {
                  borderColor: themeColors.white.dark,
                },
              }}
              spacing={20}
            >
              <Avatar
                alt="Remy Sharp"
                sx={{ outline: "none" }}
                src="/assets/images/sample/sample-media-1.png"
              />
              <Avatar
                alt="Travis Howard"
                sx={{ outline: "none" }}
                src="/assets/images/sample/sample-media-2.png"
              />
              <Avatar
                alt="Cindy Baker"
                sx={{ outline: "none" }}
                src="/assets/images/sample/sample-media-3.png"
              />
            </AvatarGroup>

            <IconButton>
              <ArrowForwardIosOutlinedIcon
                sx={{ fontSize: 24, color: themeColors.text.primary }}
              />
            </IconButton>
          </Box>
        </>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          mt: 3.5,
          mb: { xs: 5, md: 0 },
        }}
      >
        <Button small={isMobile ? true : false} variant="outlined">
          {isMobile ? "View Full Profile" : "View Profile"}
        </Button>

        {isMobile && (
          <Button small={isMobile ? true : false} variant="outlined">
            Set up a meeting with Dr. Maya
          </Button>
        )}
        <Button
          small={isMobile ? true : false}
          variant={isMobile ? "contained" : "outlined"}
        >
          Connect Dr. Maya
        </Button>
      </Box>
      {isMobile && (
        <>
          <Typography
            variant="bodyBold"
            sx={{ color: themeColors.text.primary }}
          >
            Mutual Connections
          </Typography>
          <Box sx={{ display: "flex", mt: 1, justifyContent: "space-between" }}>
            <AvatarGroup
              sx={{
                ["& .MuiAvatarGroup-avatar"]: {
                  borderColor: themeColors.white.dark,
                },
              }}
              spacing={20}
            >
              <Avatar
                alt="Remy Sharp"
                sx={{ outline: "none" }}
                src="/assets/images/sample/sample-media-1.png"
              />
              <Avatar
                alt="Travis Howard"
                sx={{ outline: "none" }}
                src="/assets/images/sample/sample-media-2.png"
              />
              <Avatar
                alt="Cindy Baker"
                sx={{ outline: "none" }}
                src="/assets/images/sample/sample-media-3.png"
              />
            </AvatarGroup>

            <IconButton>
              <ArrowForwardIosOutlinedIcon
                sx={{ fontSize: isMobile ? 22 :24, color: themeColors.text.primary }}
              />
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MutualConnection;
