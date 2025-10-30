import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useThemeColors } from "@/hooks";
import { SvgIcon } from "@/components";
import Image from "next/image";

interface ProfileDetailItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  value: string;
}

interface ProfileDetailsProps {
  memberSince?: string;
  networkConnections?: number;
  badgeNumber?: number;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  memberSince = "October 2025",
  networkConnections = 12,
  badgeNumber = 3,
}) => {
  const themeColors = useThemeColors();

  const details: ProfileDetailItem[] = [
    {
      icon: (
        <SvgIcon
          name="timerBig"
          width={50}
          height={50}
        />
      ),
      title: "UniVerse Club Member Since",
      subtitle: memberSince,
      value: "",
    },
    {
      icon: (
        <SvgIcon
          name="peoplebig"
          width={50}
          height={50}
        />
      ),
      title: "UniVerse Club Network",
      subtitle: `${networkConnections} Connections`,
      value: "",
    },
    {
      icon: (
        <SvgIcon
          name="badgebig"
          width={50}
          height={50}
        />
      ),
      title: `Badge number ${badgeNumber}`,
      subtitle: "Achievement",
      value: "",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",  flexWrap: "wrap",
        columnGap: 10,
        rowGap: 5,
        mt: 5,
      }}
    >
      {details.map((detail, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
          
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              bgcolor: themeColors.background.secondary,
              display: "flex",
              alignItems: "center",
              //   justifyContent: "center",
            }}
          >
            {detail.icon}
          </Box>

          {/* Title */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="bodyRegular"
              sx={{
                color: themeColors.grey.dark,
              }}
            >
              {detail.title}
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="subtitleLight"
              sx={{
                color: themeColors.grey.main,
              }}
            >
              {detail.subtitle}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ProfileDetails;
