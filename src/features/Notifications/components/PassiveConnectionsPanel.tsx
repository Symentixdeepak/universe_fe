import React from "react";
import { Box, Typography } from "@mui/material";
import { useThemeColors } from "@/hooks";
import NotificationItem from "./NotificationItem";
import { useRouter } from "next/router";
import { Button } from "@/components";

interface PassiveConnectionsPanelProps {
  open: boolean;
  onClose: () => void;
  totalConnections: number;
  drawerMarginLeft: number;
  notificationDrawerWidth: number;
}

const data = [
  {
    id: "1",
    avatar: "/dr_maya.png",
    title: "Ross Geller",
    subtitle: "Daily connection found!",
    info: "New Connection",
    time: "3 hours ago",
    isUnread: true,
  },
  {
    id: "2",
    avatar: "/dr_maya.png",
    title: "Ross Geller Accepted!",
    subtitle: "Daily connection found!",
    time: "6 hours ago",
    info: "New Connection",

    isUnread: true,
  },
  {
    id: "3",
    avatar: "/dr_maya.png",
    title: "The UniVerse turns 3!",
    isUnread: true,
    subtitle: "Daily connection found!",
    time: "3 days ago",
  },
  {
    id: "4",
    avatar: "/dr_maya.png",
    title: "Universe Notification",
    info: "New Connection",
    isUnread: true,
    subtitle: "Daily connection found!",
    time: "4 days ago",
  },
];

export const PassiveConnectionsPanel: React.FC<PassiveConnectionsPanelProps> = ({
  open,
  onClose,
  totalConnections,
  drawerMarginLeft,
  notificationDrawerWidth,
}) => {
  const themeColors = useThemeColors();
  const router = useRouter();

  const handleNotificationClick = (id: string) => {
    router.push(`/user/daily-connections?connection=${id}`, undefined, {
      shallow: true,
    });
  };

  const handleViewAllConnections = () => {
    const connectionIds = data.map((item) => `connection=${item.id}`).join("&");
    router.push(`/user/daily-connections?${connectionIds}&count=1&total=${data.length}`, undefined, {
      shallow: true,
    });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "0px",
        bottom: "0px",
        left: {
          xs: 0,
          sm: `${drawerMarginLeft + notificationDrawerWidth}px`,
        },
        width: { xs: "100%", sm: "372px" },
        backgroundColor: themeColors.white.main,
        borderTopRightRadius: "20px",
        borderBottomRightRadius: "20px",
        zIndex: 1400,
        transform: open ? "translateX(0)" : "translateX(-100%)",
        opacity: open ? 1 : 0,
        transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
        pointerEvents: open ? "auto" : "none",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Scrollable Content */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          padding: "20px",
        }}
      >
        {data.map((notification) => (
          <NotificationItem
            key={notification.id}
            isPassive={true}
            {...notification}
            onClick={() => handleNotificationClick(notification.id)}
          />
        ))}
      </Box>

      {/* Fixed Bottom Button */}
      <Box
        sx={{
          padding: "16px",
          borderBottomRightRadius: "20px",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Button small={true} onClick={handleViewAllConnections} variant="outlined">
            {" "}
            View All Connections
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PassiveConnectionsPanel;
