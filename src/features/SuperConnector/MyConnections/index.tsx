import React, { useState, useEffect } from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  IconButton,
  Typography,
  Fade,
  Slide,
  Zoom,
} from "@mui/material";
import { useThemeColors } from "@/hooks";
import { useRouter } from "next/router";
import { Loader } from "@/components";
import SearchSidebar from "./component/SearchSidebar";
import Connection from "./component/Connection";

interface MyConnectionsProps {
  selectedUserId?: string;
}

const MyUniverse: React.FC<MyConnectionsProps> = ({ selectedUserId }) => {
  const themeColors = useThemeColors();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedConnectionId, setSelectedConnectionId] = useState<string>(
    selectedUserId || ""
  );

  // Track if we should show profile on mobile
  const [showMobileProfile, setShowMobileProfile] = useState(false);

  // Track loading state
  const [isLoading, setIsLoading] = useState(false);

  // Track current status filter
  const [currentStatus, setCurrentStatus] = useState<'accepted' | 'pending'>('pending');

  // Simple effect to handle route changes
  useEffect(() => {
    const showProfile = router.query.show_profile === "true";

    if (selectedUserId) {
      setSelectedConnectionId(selectedUserId);
      setIsLoading(false); // Content is ready
    }

    if (isMobile && showProfile && selectedUserId) {
      setShowMobileProfile(true);
    } else {
      setShowMobileProfile(false);
    }
  }, [selectedUserId, router.query.show_profile, isMobile]);

  const handleConnectionSelect = (connectionId: string) => {
    // Show loading and navigate
    setIsLoading(true);
    router.push(`/superconnector/connections/${connectionId}`, undefined, {
      shallow: true,
    });
  };



  const handleStatusChange = (status: 'accepted' | 'pending') => {
    setCurrentStatus(status);
    // Reset selected connection when status changes
    setSelectedConnectionId("");
  };

  // Simple logic: show content if we have a selectedUserId
  const showContent = !!selectedUserId;
  const showMobileContent = isMobile && !!selectedUserId && !showMobileProfile;

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        bgcolor: themeColors.white.dark,
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* Left Sidebar - Show when no content selected or on desktop */}
      {(!isMobile || (!showContent && !showMobileProfile)) && (
        <Box
          sx={{
            width: { xs: "100%", md: "26%" },
            height: "100%",
            flexShrink: 0,
          }}
        >
          <SearchSidebar
            selectedConnectionId={selectedConnectionId}
            onConnectionSelect={handleConnectionSelect}
            onStatusChange={handleStatusChange}
          />
        </Box>
      )}

      {/* Desktop: Show placeholder when no selection */}
      {!isMobile && !selectedConnectionId && (
        <Box
          sx={{
            m: "auto",
          }}
        >
          <Typography
            variant="bodyLight"
            sx={{ color: themeColors.text.secondary }}
          >
            Select a connection to view
          </Typography>
        </Box>
      )}

      {/* Middle Content - Show when user selected and not showing profile */}
      {showMobileContent && (
        <Box
          sx={{
            width: { xs: "100%", md: "74%" },
            height: "100%",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {isLoading ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Loader />
            </Box>
          ) : (
            <Connection status={currentStatus} />
          )}
        </Box>
      )}

      {/* Desktop Middle Content */}
      {!isMobile && showContent && (
        <Box
          sx={{
            overflow: "hidden",
            m: "auto",
            flexShrink: 0,
          }}
        >
          {isLoading ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Loader />
            </Box>
          ) : (
            <Connection status={currentStatus} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default MyUniverse;
