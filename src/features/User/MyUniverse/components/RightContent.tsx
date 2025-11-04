import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhotoIcon from "@mui/icons-material/Photo";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SvgIcon } from "@/components";
import { useThemeColors } from "@/hooks";
import SharedMedia from "./SharedMedia";
import MutualConnection from "./MutualConnection";

interface UserInfo {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
  mutualConnections: number;
  connectedVia: string;
  location?: string;
  bio?: string;
  interests?: string[];
}

interface SharedMedia {
  id: string;
  type: "image" | "file";
  name: string;
  url: string;
  date: string;
}

interface RightContentProps {
  selectedConnectionId?: string;
  userInfo?: UserInfo;
  sharedMedia?: SharedMedia[];
  onBackClick?: () => void;
}

const RightContent: React.FC<RightContentProps> = ({
  selectedConnectionId,
  userInfo = {
    id: "1",
    name: "Dr. Maya K.",
    avatar: "/dr_maya.png",
    status: "online",
    mutualConnections: 12,
    connectedVia: "UniVerse",
    location: "San Francisco, CA",
    bio:
      "Passionate about connecting people and building meaningful relationships in the digital age.",
    interests: [
      "Technology",
      "Healthcare",
      "Innovation",
      "Research",
      "Networking",
    ],
  },
  sharedMedia = [
    {
      id: "1",
      type: "image",
      name: "Conference_photo.jpg",
      url: "/conference.jpg",
      date: "Nov 1, 2025",
    },
    {
      id: "2",
      type: "file",
      name: "Research_document.pdf",
      url: "/research.pdf",
      date: "Oct 28, 2025",
    },
    {
      id: "3",
      type: "image",
      name: "Team_meeting.jpg",
      url: "/meeting.jpg",
      date: "Oct 25, 2025",
    },
  ],
  onBackClick,
}) => {
  const themeColors = useThemeColors();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [activeTab, setActiveTab] = useState<"profile" | "media">("profile");

  if (!selectedConnectionId) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          bgcolor: themeColors.white.light,
          borderLeft: `1px solid ${themeColors.white.dark}`,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Typography
          variant="bodyLight"
          sx={{ color: themeColors.text.secondary }}
        >
          Select a chat to view details
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: themeColors.white.dark,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Content Area */}
      <Box sx={{ flex: 1, overflowY: "auto", padding: "20px 25px 20px 25px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* User Profile Section */}
          <Box sx={{ mb: 3, flexDirection: "column", display: "flex" }}>
            <Avatar
              src={userInfo.avatar}
              alt={userInfo.name}
              sx={{
                width: 160,
                height: 160,

                mb: 2,
              }}
            />
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.2, ml: 4 }}
            >
              <Box
                sx={{
                  height: 8,
                  width: 8,
                  borderRadius: 50,
                  background: "#31C12C",
                }}
              />
              <Typography
                variant="bodyBold"
                sx={{ color: themeColors.text.primary }}
              >
                {userInfo.name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                mt: 0.5,
                ml: 4,
              }}
            >
              <Box
                sx={{
                  height: 8,
                  width: 8,
                  borderRadius: 50,
                  background: themeColors.pantone.light,
                }}
              />
              <Typography
                variant="subtitleLight"
                sx={{ color: themeColors.pantone.light }}
              >
                {userInfo.status === "online"
                  ? "Available"
                  : "Last seen recently"}
              </Typography>
            </Box>
          </Box>
          {/*top right icons */}

          <Box
            sx={{
              display: "flex",
              gap: 0,
              mt: -0.5,
              justifyContent: "flex-end",
            }}
          >
            <IconButton>
              <SvgIcon name="user_tick" width={20} height={20} />
            </IconButton>
            <IconButton>
              <SvgIcon name="three_dot" width={20} height={20} />
            </IconButton>
          </Box>
        </Box>

        {isMobile ? (
          <>
            <MutualConnection  isMobile={true}/>
            <SharedMedia isMobile={true}/>
          </>
        ) : (
          <>
            <SharedMedia isMobile={false} />
            <MutualConnection isMobile={false} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default RightContent;
