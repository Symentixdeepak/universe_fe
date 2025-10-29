import React from "react";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { SidebarProvider, useSidebar } from "@/contexts/SideBarContext";

interface LayoutWrapperProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showNavbar?: boolean;
}

const SIDEBAR_WIDTH_EXPANDED = 185;
const SIDEBAR_WIDTH_COLLAPSED = 60;
const NAVBAR_HEIGHT = 62;

const LayoutContent: React.FC<LayoutWrapperProps> = ({
  children,
  showSidebar = true,
  showNavbar = true,
}) => {
  const { isSidebarExpanded, toggleSidebar } = useSidebar();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
      {showSidebar && (
        <Box
          sx={{
            width: isSidebarExpanded ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED,
            flexShrink: 0,
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.standard, // Smoother timing
              }),
          }}
        >
          <Sidebar isExpanded={isSidebarExpanded} onToggle={toggleSidebar} />
        </Box>
      )}

      <Box
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${
            showSidebar ? (isSidebarExpanded ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED) : 0
          }px)`,
          transition: (theme) =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.standard, // Smoother timing
            }),
        }}
      >
        {showNavbar && (
          <Box
            sx={{
              height: NAVBAR_HEIGHT,
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              transition: (theme) =>
                theme.transitions.create(["width", "left"], {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.standard, // Smoother timing
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
            marginTop: showNavbar ? `${NAVBAR_HEIGHT}px` : 0,
            transition: (theme) =>
              theme.transitions.create(["margin"], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.standard, // Smoother timing
              }),
            overflow: "auto",
          }}
        >
          {children}
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
