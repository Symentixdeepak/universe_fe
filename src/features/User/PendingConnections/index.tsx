import React, { useState, useEffect } from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useThemeColors } from "@/hooks";
import { useRouter } from "next/router";
import {
  SearchSidebar,
  ProfileHeader,
  ProfileDetails,
  ProfileAboutFooter,
} from "./components";
import PendingConnection from "./components/PendingConnection";

interface MyUniverseProps {
  selectedUserId?: string;
}

const MyUniverse: React.FC<MyUniverseProps> = ({ selectedUserId }) => {
  const themeColors = useThemeColors();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedConnectionId, setSelectedConnectionId] = useState<string>(
    selectedUserId || ""
  );

  // Track if we should show content on mobile (when a connection is selected)
  const [showMobileContent, setShowMobileContent] = useState(false);

  // Update selectedConnectionId when selectedUserId prop changes
  useEffect(() => {
    if (selectedUserId) {
      setSelectedConnectionId(selectedUserId);
      if (isMobile) {
        setShowMobileContent(true);
      }
    }
  }, [selectedUserId, isMobile]);

  const handleConnectionSelect = (connectionId: string) => {
    setSelectedConnectionId(connectionId);

    // On mobile, show the content and navigate with router
    if (isMobile) {
      setShowMobileContent(true);
      // Navigate to the user's profile with router.push on mobile too
      router.push(`/user/pending_connections/${connectionId}`, undefined, {
        shallow: true,
      });
    } else {
      // Navigate to the new user's profile on desktop
      router.push(`/user/pending_connections/${connectionId}`);
    }
  };

  const handleBackToSidebar = () => {
    if (isMobile) {
      setShowMobileContent(false);
      setSelectedConnectionId("");
      // Navigate back to the index route
      router.push("/user/pending_connections", undefined, { shallow: true });
    }
  };

  return (
    <Box
      sx={{
        display: isMobile ? "block" : "flex",
        height: "100vh", // Full viewport height
        bgcolor: selectedConnectionId
          ? themeColors.white.main
          : themeColors.white.dark,
        overflow: "hidden", // Prevent main container scroll
      }}
    >
      {/* Left Sidebar - Show when no connection selected on mobile or always on desktop */}
      {(!isMobile || !showMobileContent) && (
        <Box
          sx={{
            width: { xs: "100%", md: "370px" },
            height: "100vh",
            overflow: "auto", // Sidebar scrolls independently
            flexShrink: 0,
          }}
        >
          <SearchSidebar
            selectedConnectionId={selectedConnectionId}
            onConnectionSelect={handleConnectionSelect}
          />
        </Box>
      )}

      {router.query.pending ? (
        <PendingConnection />
      ) : (
        <>
          {/* Main Content - Show on desktop or when connection selected on mobile */}
          {(!isMobile || showMobileContent) && selectedConnectionId && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: isMobile ? "25px" : "40px",
                width: isMobile ? "100%" : "auto",
                height: "100vh", // Full viewport height
                overflow: "auto", // Main content scrolls independently
              }}
            >
              {/* Profile Header */}
              <ProfileHeader
                name="Dr. Maya K."
                location="San Francisco, CA"
                description="Building AI solutions that make healthcare smarter and more human."
                connectedVia="Aelia Kos"
                avatar="/dr_maya.png"
                connectedSince="Dec 2024"
                isFromPendingConnections={true}
              />

              {/* Profile Details */}
              <ProfileDetails />

              {/* Profile About Footer */}
              <ProfileAboutFooter />
            </Box>
          )}

          {!isMobile && !selectedConnectionId && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="bodyLight"
                sx={{ color: themeColors.text.primary }}
              >
                Select a connection to view their profile.
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default MyUniverse;
