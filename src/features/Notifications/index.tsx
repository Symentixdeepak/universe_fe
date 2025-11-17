import React, { useState } from "react";
import { Box, useMediaQuery, useTheme, Backdrop } from "@mui/material";
import { useThemeColors } from "@/hooks";
import { useSidebar } from "@/contexts/SideBarContext";
import {
  NotificationHeader,
  NotificationItem,
  NotificationFooter,
  PassiveConnectionsPanel,
} from "./components";

// Import sidebar width constants
const SIDEBAR_WIDTH_EXPANDED = 185;
const SIDEBAR_WIDTH_COLLAPSED = 60;
const DRAWER_WIDTH = 372;

interface Notification {
  id: string;
  avatar: string;
  title: string;
  subtitle: string;
  time: string;
  isUnread?: boolean;
  info?: string;
}

interface NotificationDrawerProps {
  open: boolean;
  onClose: () => void;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    avatar: "/dr_maya.png",
    title: "Ross Geller",
    subtitle: "Hey, did you see my monkey?",
    info: "New Connection",
    time: "3 hours ago",
    isUnread: true,
  },
  {
    id: "2",
    avatar: "/dr_maya.png",
    title: "Ross Geller Accepted!",
    subtitle: "",
    time: "6 hours ago",
    info: "New Connection",

    isUnread: true,
  },
  {
    id: "3",
    avatar: "/dr_maya.png",
    title: "The UniVerse turns 3!",
    info: "New Connection",

    subtitle: "",
    time: "3 days ago",
  },
  {
    id: "4",
    avatar: "/dr_maya.png",
    title: "Universe Notification",
    info: "New Connection",

    subtitle: "",
    time: "4 days ago",
  },
  {
    id: "5",
    avatar: "/dr_maya.png",
    title: "Bruce wishes to Connect!",
    info: "New Connection",

    subtitle: "",
    time: "7 days ago",
  },
  {
    id: "6",
    avatar: "/dr_maya.png",
    title: "Chandler Bing",
    subtitle: "",
    info: "New Connection",

    time: "9 days ago",
  },
  {
    id: "7",
    avatar: "/dr_maya.png",
    title: "Universe Notification",
    info: "New Connection",

    subtitle: "",
    time: "12 days ago",
  },
  {
    id: "8",
    avatar: "/dr_maya.png",
    title: "Universe Notification",
    info: "New Connection",

    subtitle: "",
    time: "2 weeks ago",
    isUnread: true,
  },
  {
    id: "9",
    avatar: "/dr_maya.png",
    title: "Universe Notification",
    subtitle: "",
    time: "2 weeks ago",
    info: "New Connection",

    isUnread: true,
  },
];

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  open,
  onClose,
}) => {
  const themeColors = useThemeColors();
  const { isSidebarExpanded } = useSidebar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchValue, setSearchValue] = useState("");
  const [passivePanelOpen, setPassivePanelOpen] = useState(false);

  // Calculate margin based on sidebar state
  const drawerMarginLeft = isMobile
    ? 0
    : isSidebarExpanded
    ? SIDEBAR_WIDTH_EXPANDED
    : SIDEBAR_WIDTH_COLLAPSED;

  const handleClearAll = () => {
    console.log("Clear all notifications");
  };

  const handleNotificationClick = (id: string) => {
    console.log("Notification clicked:", id);
  };

  const handlePassiveConnectionsClick = () => {
    setPassivePanelOpen(!passivePanelOpen);
  };

  const handlePassivePanelClose = () => {
    setPassivePanelOpen(false);
  };

  const handleCloseAll = () => {
    setPassivePanelOpen(false);
    onClose();
  };

  // Close passive panel when notification drawer closes
  React.useEffect(() => {
    if (!open) {
      setPassivePanelOpen(false);
    }
  }, [open]);

  const filteredNotifications = MOCK_NOTIFICATIONS.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      notification.subtitle.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      {/* Backdrop only on right content area */}
      <Box
        onClick={handleCloseAll}
        sx={{
          position: "fixed",
          top: 0,
          left: { xs: 0, md: `${drawerMarginLeft + DRAWER_WIDTH}px` },
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1200,
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
        }}
      />

      {/* Notification Box with Slide Animation */}
      <Box
        sx={{
          position: "fixed",
          top: "8px",
          bottom: "0px",
          left: `${drawerMarginLeft}px`,
          width: {
            xs: `calc(100% - ${drawerMarginLeft}px)`,
            sm: `${DRAWER_WIDTH}px`,
          },
          backgroundColor: themeColors.white.main,
                borderTopRightRadius: "20px",
        borderBottomRightRadius: "20px",
          zIndex: 1300,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          opacity: open ? 1 : 0,
          transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
          pointerEvents: open ? "auto" : "none",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          p: 2,
        }}
      >
        {/* Header */}
        <NotificationHeader
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        {/* Notification List - Scrollable */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            backgroundColor: themeColors.white.main,
            mt: 2.5,
          }}
        >
          {filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              {...notification}
              onClick={() => handleNotificationClick(notification.id)}
            />
          ))}
        </Box>

        {/* Footer */}
        <NotificationFooter 
          totalConnections={2} 
          onClearAll={handleClearAll}
          passivePanelOpen={passivePanelOpen}
          onPassiveConnectionsClick={handlePassiveConnectionsClick}
        />
      </Box>

      {/* Passive Connections Panel */}
      <PassiveConnectionsPanel
        open={passivePanelOpen}
        onClose={handlePassivePanelClose}
        totalConnections={2}
        drawerMarginLeft={drawerMarginLeft}
        notificationDrawerWidth={DRAWER_WIDTH}
      />
    </>
  );
};

export default NotificationDrawer;
