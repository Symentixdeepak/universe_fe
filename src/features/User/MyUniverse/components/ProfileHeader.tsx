import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useThemeColors } from "@/hooks";
import { Button } from "@/components";
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
            mt: 1.5,
            width: 145,
            height: 145,
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
              variant="h3Bold"
              sx={{
                color: themeColors.text.primary,
              }}
            >
              {name}
            </Typography>
          </Box>

          {/* Location */}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.8 }}
          >
           <Image src="/assets/images/icons/location.svg" width={13} height={13}/>
            <Typography
              variant="subtitleLight"
              sx={{
                color: themeColors.text.secondary,
              }}
            >
              {location}
            </Typography>
          </Box>

          {/* Description */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="bodyRegular"
              sx={{
                color: themeColors.text.primary,
                mb: 0.8,
                maxWidth: "230px",
                lineHeight: 1.4,
              }}
            >
              {description}
            </Typography>

            {/* Connected Via */}
            <Typography
              variant="subtitleLight"
              sx={{
                mb: 3,
                color: themeColors.text.secondary,
              }}
            >
              Connected via{" "}
              <Typography
                variant="subtitleBold"
                sx={{ color: themeColors.pantone.main }}
              >
                {connectedVia}
              </Typography>
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
        <Box sx={{ display: "flex", gap: 2, maxWidth: "400px", width: "100%" }}>
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

        <Typography variant="subtitleLight" sx={{color:themeColors.grey.main}}>
          Connected since {connectedSince}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
