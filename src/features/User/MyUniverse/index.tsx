import React, { useState, useEffect } from "react";
import { Box, useMediaQuery, useTheme, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useThemeColors } from "@/hooks";
import { useRouter } from "next/router";
import {
  SearchSidebar,
  ProfileHeader,
  ProfileDetails,
  ProfileAboutFooter,
} from "./components";

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
      router.push(`/user/my-universe/${connectionId}`, undefined, { shallow: true });
    } else {
      // Navigate to the new user's profile on desktop
      router.push(`/user/my-universe/${connectionId}`);
    }
  };

  const handleBackToSidebar = () => {
    if (isMobile) {
      setShowMobileContent(false);
      setSelectedConnectionId("");
      // Navigate back to the index route
      router.push('/user/my-universe', undefined, { shallow: true });
    }
  };

  return (
    <Box
      sx={{
        display: isMobile ? "block" : "flex",
        minHeight: "100vh",
        bgcolor: themeColors.background.primary,
      }}
    >
      {/* Left Sidebar - Show when no connection selected on mobile or always on desktop */}
      {(!isMobile || !showMobileContent) && (
        <SearchSidebar
          selectedConnectionId={selectedConnectionId}
          onConnectionSelect={handleConnectionSelect}
        />
      )}

      {/* Main Content - Show on desktop or when connection selected on mobile */}
      {(!isMobile || showMobileContent) && selectedConnectionId && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: isMobile ? "25px" : "40px",
            width: isMobile ? "100%" : "auto",
          }}
        >


          {/* Profile Header */}
          <ProfileHeader
            name="Dr. Maya K."
            location="San Francisco, CA"
            description="Passionate healthcare innovator focused on AI-driven solutions that improve patient outcomes and accessibility."
            connectedVia="Aelia Kos"
            avatar="/dr_maya.png"
            connectedSince="Dec 2024"
          />

          {/* Profile Details */}
          <ProfileDetails />

          {/* Profile About Footer */}
          <ProfileAboutFooter />
        </Box>
      )}
    </Box>
  );
};

export default MyUniverse;
