import React from "react";
import { Box, Typography, Avatar, useTheme } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useThemeColors } from "@/hooks";
import { Button, SvgIcon } from "@/components";
import { colorProfiles } from "@/styles/theme";
import Image from "next/image";

interface ProfileHeaderProps {
  name: string;
  location: string;
  description: string;
  connectedVia: string;
  avatar: string;
  connectedSince: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name = "Dr. Maya K.",
  location = "New York, USA",
  description = "Building AI solutions that make healthcare smarter and more human.",
  connectedVia = "Aella Kos",
  avatar = "/dr_maya.png",
  connectedSince = "22/10/2025",
}) => {
  const themeColors = useThemeColors();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",

        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 3,
          maxWidth: "400px",
        }}
      >
        <Avatar
          src={avatar}
          alt={name}
          sx={{
            mt: { xs: 0.5, md: 1.5 },
            width: { xs: 130, md: 145 },
            height: { xs: 130, md: 145 },
          }}
        />

        {/* Profile Info */}
        <Box sx={{ flex: 1 }}>
          {/* Name and Connected Status */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 0.8,
            }}
          >
            <Typography
              sx={{
                color: themeColors.text.primary,
                typography: { xs: "h4Bold", md: "h3Bold" },
                fontSize: { xs: "20px", md: "28px" },
              }}
            >
              {name}
            </Typography>
          </Box>

          {/* Location */}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.8 }}
          >
            <SvgIcon name="location" width={13} height={13} />
            <Typography
              sx={{
                color: themeColors.text.secondary,
                typography: { xs: "captionLight", md: "subtitleLight" },
              }}
            >
              {location}
            </Typography>
          </Box>

          {/* Description */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                color: themeColors.text.primary,
                typography: { xs: "subtitleRegular", md: "bodyRegular" },
                mb: 0.8,
                maxWidth: "230px",
                lineHeight: 1.4,

                // Multi-line ellipsis for xs/sm
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",

                [theme.breakpoints.down("md")]: {
                  WebkitLineClamp: 3, // show max 3 lines then ...
                },
              }}
            >
              {description}
            </Typography>

            {/* Connected Via */}
            <Typography
              sx={{
                mb: { xs: 0, md: 3 },
                color: themeColors.text.secondary,
                typography: { xs: "captionLight", md: "subtitleLight" },
              }}
            >
              Connected via{" "}
              <Typography
                component={"span"}
                sx={{
                  color: themeColors.pantone.main,
                  typography: { xs: "captionBold", md: "subtitleBold" },
                }}
              >
                {connectedVia}
              </Typography>
            </Typography>
            <Typography
              variant="captionLight"
              sx={{
                mb: { xs: 3, md: 0 },
                color: themeColors.grey.main,
                display: { xs: "block", md: "none" },
              }}
            >
              
              Since {connectedSince}
            </Typography>
          </Box>

          {/* Action Buttons */}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, md: 2 },
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <Button variant="outlined" fullWidth>
            Message
          </Button>

          <Button
            sx={{
              borderRadius: "25px",
              color: "#E0E0E0",
              border: "1px solid #282828",
              py: 1.5,
              backgroundColor: "#0E76A8",
              "&:hover": {
                backgroundColor: colorProfiles.pantones.main,
                border: `1px solid ${colorProfiles.pantones.main}`,
              },
            }}
            variant="outlined"
            fullWidth
          >
            LinkedIn
          </Button>
        </Box>

        <Typography
          variant="subtitleLight"
          sx={{
            color: themeColors.grey.main,
            display: { xs: "none", md: "block" },
          }}
        >
          Connected since {connectedSince}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
