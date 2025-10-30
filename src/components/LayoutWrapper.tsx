import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { SidebarProvider, useSidebar } from "@/contexts/SideBarContext";
import { ErrorBoundary } from "@/components";

interface LayoutWrapperProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showNavbar?: boolean;
}

const SIDEBAR_WIDTH_EXPANDED = 185;
const SIDEBAR_WIDTH_COLLAPSED = 60;
const NAVBAR_HEIGHT_DESKTOP = 62;
const NAVBAR_HEIGHT_MOBILE = 56;

const LayoutContent: React.FC<LayoutWrapperProps> = ({
  children,
  showSidebar = true,
  showNavbar = true,
}) => {
  const { isSidebarExpanded, toggleSidebar } = useSidebar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navbarHeight = isMobile ? NAVBAR_HEIGHT_MOBILE : NAVBAR_HEIGHT_DESKTOP;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
      {showSidebar && !isMobile && (
        <Box
          sx={{
            width: isSidebarExpanded ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED,
            flexShrink: 0,
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.standard,
              }),
          }}
        >
          <Sidebar isExpanded={isSidebarExpanded} onToggle={toggleSidebar} />
        </Box>
      )}
      
      {/* Mobile sidebar - rendered separately */}
      {showSidebar && isMobile && (
        <Sidebar isExpanded={isSidebarExpanded} onToggle={toggleSidebar} />
      )}

      <Box
        sx={{
          flexGrow: 1,
          width: isMobile 
            ? "100%" 
            : `calc(100% - ${
                showSidebar ? (isSidebarExpanded ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED) : 0
              }px)`,
          transition: (theme) =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.standard,
            }),
        }}
      >
        {(showNavbar || isMobile) && (
          <Box
            sx={{
              height: navbarHeight,
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              transition: (theme) =>
                theme.transitions.create(["width", "left"], {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.standard,
                }),
              zIndex: (theme) => theme.zIndex.appBar,
            }}
          >
            <Navbar isSidebarExpanded={isSidebarExpanded} />
          </Box>
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: "100vh",
            marginTop: (showNavbar || isMobile) ? `${navbarHeight}px` : 0,
            transition: (theme) =>
              theme.transitions.create(["margin"], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.standard,
              }),
            overflow: "auto",
          }}
        >
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </Box>
      </Box>
    </Box>
  );
};

export const LayoutWrapper: React.FC<LayoutWrapperProps> = (props) => (
  <SidebarProvider>
    <LayoutContent {...props} />
  </SidebarProvider>
);

export default LayoutWrapper;
