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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useThemeColors } from "@/hooks";
import { useRouter } from "next/router";
import { SearchSidebar, MiddleContent, RightContent } from "./components";
import { Loader } from "@/components";
import ShowProfile from "./components/ShowProfile";

interface MyUniverseProps {
  selectedUserId?: string;
}

const MyUniverse: React.FC<MyUniverseProps> = ({ selectedUserId }) => {
  const themeColors = useThemeColors();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isProfileView = router.query.view_profile === "true" ? true : false;

  const [selectedConnectionId, setSelectedConnectionId] = useState<string>(
    selectedUserId || ""
  );

  // Track if we should show profile on mobile
  const [showMobileProfile, setShowMobileProfile] = useState(false);

  // Track loading state
  const [isLoading, setIsLoading] = useState(false);

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
    router.push(`/user/my-universe/${connectionId}`, undefined, {
      shallow: true,
    });
  };

  const handleBackToSidebar = () => {
    if (isMobile) {
      // Navigate back to the index route
      router.push("/user/my-universe", undefined, { shallow: true });
    }
  };

  const handleBackFromProfile = () => {
    if (isMobile) {
      setShowMobileProfile(false);
      // Remove the show_profile query parameter
      const currentPath = router.asPath.split("?")[0];
      router.push(currentPath, undefined, { shallow: true });
    }
  };

  // Simple logic: show content if we have a selectedUserId
  const showContent = !!selectedUserId;
  const showMobileContent = isMobile && !!selectedUserId && !showMobileProfile;
  
  // Show profile view on mobile
  const showMobileProfileView = isMobile && isProfileView && !!selectedUserId;

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh", // Full viewport height
        bgcolor: isProfileView ? themeColors.white.main :themeColors.white.dark,
        overflow: "hidden", // Prevent main container from scrolling
        width: "100%",
      }}
    >
      <>
        {/* Left Sidebar - Show when no content selected or on desktop */}
        {(!isMobile || (!showContent && !showMobileProfile)) && (
          <Box
            sx={{
              width: { xs: "100%", md: "28%" },
              height: "100vh", // Full viewport height
              overflow: "auto", // Allow sidebar to scroll independently
              flexShrink: 0,
            }}
          >
            <SearchSidebar
              selectedConnectionId={selectedConnectionId}
              onConnectionSelect={handleConnectionSelect}
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
              Select a chat to start messaging
            </Typography>
          </Box>
        )}

        {/* Middle Content - Show when user selected and not showing profile */}
        {(showMobileContent || showMobileProfileView) && (
          <Box
            sx={{
              width: { xs: "100%", md: "44%" },
              height: "100vh", // Full viewport height
              overflow: "auto", // Allow middle content to scroll independently
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
            ) : isProfileView ? (
              <ShowProfile />
            ) : (
              <MiddleContent
                selectedConnectionId={selectedConnectionId}
                selectedConnection={
                  selectedConnectionId
                    ? {
                        id: selectedConnectionId,
                        name: "Dr. Maya K.",
                        avatar: "/dr_maya.png",
                        status: "online",
                      }
                    : undefined
                }
                onBackClick={handleBackToSidebar}
              />
            )}
          </Box>
        )}

        {/* Desktop Middle Content */}
        {!isMobile && showContent && (
          <Box
            sx={{
              width: isProfileView ? "72%" : "44%",
              height: "100vh", // Full viewport height
              overflow: "auto", // Allow desktop middle content to scroll independently
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
            ) : isProfileView ? (
              <ShowProfile />
            ) : (
              <MiddleContent
                selectedConnectionId={selectedConnectionId}
                selectedConnection={
                  selectedConnectionId
                    ? {
                        id: selectedConnectionId,
                        name: "Dr. Maya K.",
                        avatar: "/dr_maya.png",
                        status: "online",
                      }
                    : undefined
                }
                onBackClick={handleBackToSidebar}
              />
            )}
          </Box>
        )}

        {/* Right Content - Desktop or Mobile Profile */}
        {((!isMobile && showContent) || (isMobile && showMobileProfile)) &&
          !isProfileView && (
            <Box
              sx={{
                width: { xs: "100%", md: "28%" },
                height: "100vh", // Full viewport height
                overflow: "auto", // Allow right content to scroll independently
                flexShrink: 0,
              }}
            >
              <RightContent
                selectedConnectionId={selectedConnectionId}
                onBackClick={isMobile ? handleBackFromProfile : undefined}
                userInfo={
                  selectedConnectionId
                    ? {
                        id: selectedConnectionId,
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
                      }
                    : undefined
                }
              />
            </Box>
          )}
      </>
    </Box>
  );
};

export default MyUniverse;
