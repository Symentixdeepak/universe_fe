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

const SIDEBAR_WIDTH_EXPANDED = 240;
const SIDEBAR_WIDTH_COLLAPSED = 72;
const NAVBAR_HEIGHT = 62;

const LayoutContent: React.FC<LayoutWrapperProps> = ({
  children,
  showSidebar = true,
  showNavbar = true,
}) => {
  const { isSidebarExpanded, toggleSidebar } = useSidebar(); // 👈 use context

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
      {showSidebar && (
        <Box
          sx={{
            width: isSidebarExpanded ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED,
            flexShrink: 0,
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
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
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
      >
        {showNavbar && (
          <Box
            sx={{
              height: NAVBAR_HEIGHT,
              position: "fixed",
              top: 0,
              right: 0,
              width: `calc(100% - ${
                showSidebar ? (isSidebarExpanded ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED) : 0
              }px)`,
              transition: (theme) =>
                theme.transitions.create(["width", "margin"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
            }}
          >
            <Navbar isSidebarExpanded={isSidebarExpanded} />
          </Box>
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            minHeight: "100vh",
            marginTop: showNavbar ? `${NAVBAR_HEIGHT}px` : 0,
            transition: (theme) =>
              theme.transitions.create(["margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
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
