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
import { useRouter } from "next/router";
const MutualConnection = ({ isMobile = false }) => {
  const themeColors = useThemeColors();
  const router = useRouter();

  const handleViewProfile = () => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, view_profile: true },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Box mt={2}>
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
                sx={{ outline: "none",height:32,width:32 }}
                src="/assets/images/sample/sample-media-1.png"
              />
              <Avatar
                alt="Travis Howard"
                sx={{ outline: "none" ,height:32,width:32}}
                src="/assets/images/sample/sample-media-2.png"
              />
              <Avatar
                alt="Cindy Baker"
                sx={{ outline: "none",height:32,width:32 }}
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
        <Button
          onClick={handleViewProfile}
          small={isMobile ? true : false}
          variant="outlined"
        >
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
                sx={{ outline: "none",height:30,width:30}}
                src="/assets/images/sample/sample-media-1.png"
              />
              <Avatar
                alt="Travis Howard"
                sx={{ outline: "none" ,height:30,width:30}}
                src="/assets/images/sample/sample-media-2.png"
              />
              <Avatar
                alt="Cindy Baker"
                sx={{ outline: "none",height:30,width:30 }}
                src="/assets/images/sample/sample-media-3.png"
              />
            </AvatarGroup>

            <IconButton>
              <ArrowForwardIosOutlinedIcon
                sx={{
                  fontSize: isMobile ? 22 : 24,
                  color: themeColors.text.primary,
                }}
              />
            </IconButton>
          </Box>
        </>
      )}

      <Box sx={{display:'flex',flexDirection:'column'}}>
        <Typography
          variant="bodyBold"
          sx={{ color: themeColors.text.primary, mt: 3 }}
        >
          About Dr. Maya K.
        </Typography> 
        <Typography
          variant={isMobile ? "subtitleLight" : "bodyRegular"}
          sx={{ color: themeColors.text.secondary, mt: 1.5 }}
        >
          Dr. Maya K. is a renowned expert in her field with over 15 years of
          experience. She has contributed to numerous research papers and has
          been a keynote speaker at various international conferences. Her work
          focuses on innovative solutions to complex problems, making her a
          valuable connection for professionals seeking insights and
          collaboration opportunities.
        </Typography>
      </Box>
    </Box>
  );
};

export default MutualConnection;
