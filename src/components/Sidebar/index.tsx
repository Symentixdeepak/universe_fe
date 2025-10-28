import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useThemeColors } from "@/hooks";
import { styled } from "@mui/material/styles";
import Image from "next/image";

// Icons

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TextField from "../TextField";

interface SidebarProps {
  isExpanded?: boolean;
  onToggle?: () => void;
}

interface SidebarItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  path: string;
  child?: number[];
}

const SIDEBAR_WIDTH_EXPANDED = 185;
const SIDEBAR_WIDTH_COLLAPSED = 60;

const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    title: "Your Dashboard",
    icon: (
      <Image
        src="/assets/images/icons/dashboard_nav.svg"
        alt="Dashboard"
        width={20}
        height={20}
      />
    ),
    path: "/dashboard",
  },
  {
    id: "search",
    title: "Search",
    icon: (
      <Image
        src="/assets/images/icons/search_nav.svg"
        alt="Search"
        width={20}
        height={20}
      />
    ),
    path: "/search",
  },
  {
    id: "connected",
    title: "Get Connected",
    icon: (
      <Image
        src="/assets/images/icons/zoom_search_nav.svg"
        alt="Get Connected"
        width={20}
        height={20}
        quality={100}
      />
    ),
    path: "/connected",
    child: [1, 2, 3],
  },
  {
    id: "myuniverse",
    title: "My Universe",
    icon: (
      <Image
        src="/assets/images/icons/my_universe_nav.svg"
        alt="My Universe"
        width={20}
        height={20}
      />
    ),
    path: "/my-universe",
  },
  {
    id: "pending",
    title: "Pending Connection",
    icon: (
      <Image
        src="/assets/images/icons/pending_conn_nav.svg"
        alt="Pending Connection"
        width={20}
        height={20}
      />
    ),
    path: "/pending-connections",
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: (
      <Image
        src="/assets/images/icons/notification_nav.svg"
        alt="Notifications"
        width={20}
        height={20}
      />
    ),
    path: "/notifications",
  },
  {
    id: "settings",
    title: "Settings",
    icon: (
      <Image
        src="/assets/images/icons/setting_nav.svg"
        alt="Settings"
        width={20}
        height={20}
      />
    ),
    path: "/settings",
  },
];
const StyledSidebar = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isExpanded",
})<{ isExpanded: boolean }>(({ theme, isExpanded }) => ({
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  width: isExpanded ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED,
  transition: theme.transitions.create(["width"], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  zIndex: theme.zIndex.drawer,
}));

const StyledListItem = styled(ListItem)<{
  active?: boolean;
  isExpanded?: boolean;
}>(({ theme, active, isExpanded }) => ({
  marginBottom: theme.spacing(0.5),
  borderRadius: theme.spacing(1),
  marginLeft: theme.spacing(0.5),
  marginRight: theme.spacing(0.5),
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "transparent",
  },
  //   ...(active && {
  //     backgroundColor: theme.palette.action.selected,
  //   }),
}));

export const Sidebar: React.FC<SidebarProps> = ({
  isExpanded = true,
  onToggle,
}) => {
  const theme = useTheme();
  const themeColors = useThemeColors();
  const [activeItem, setActiveItem] = useState<string>("dashboard"); // ✅ track active

  const handleItemClick = (id: string) => {
    setActiveItem(id);
    onToggle();
  };

  return (
    <StyledSidebar
      isExpanded={isExpanded}
      sx={{
        backgroundColor: themeColors.white.dark,
      }}
    >
      <List sx={{ pt: 2 }}>
        {sidebarItems.slice(0, 5).map((item) => {
          if (item.id === "search") {
            return (
              <React.Fragment key={item.id}>
                      <StyledListItem
              key={item.id}
              button
              onClick={() => handleItemClick(item.id)} // ✅ click sets active
  
              isExpanded={isExpanded}
              sx={{
                minHeight: 40,
                // mb: isExpanded ? 0 : -3,
                mt: isExpanded ? 3 : 5.5, 
                mb: isExpanded ? 3 : 2,
                justifyContent: isExpanded ? "initial" : "center",
                position: "relative",
                "&:hover .MuiListItemIcon-root, &:hover .MuiTypography-root": {
                  color: `${themeColors.pantone.main} !important`,
                  transition: "color 300ms ease",
                },
              }}
            >
                        <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isExpanded ? 1.5 : "auto",
                  justifyContent: "center",
                //   mt: 0.5,
                  height: "20px",
                  width: "20px",
                  transition: "filter 300ms ease",
           
                  "&:hover img": {
                    filter:
                      "invert(42%) sepia(92%) saturate(964%) hue-rotate(11deg) brightness(91%) contrast(98%)",
                  },
                }}
              >
                {item.icon}
              </ListItemIcon>
                  <TextField
                    variant="outlined"
                    placeholder="Search"
                    sx={{
                      opacity: isExpanded ? 1 : 0,
                      height: 20,
                      "& .MuiOutlinedInput-root": {
                        height: 20,
                      },
                      "& input": {
                        padding: "0 8px",
                        fontSize: 10,
                      },
                    }}
                  />
                </StyledListItem>
                <div style={{ marginBottom: isExpanded ? 10 : 0 }}>
                  <Box
                    sx={{
                      height: 6,
                      width: 6,
                      background: themeColors.grey.light,
                      m: "auto",
                      textAlign: "center",
                      borderRadius: 999,
                    }}
                  />
                </div>
              </React.Fragment>
            );
          }

          const isActive = activeItem === item.id; // ✅ check active state

          return (
            <StyledListItem
              key={item.id}
              button
              onClick={() => handleItemClick(item.id)} // ✅ click sets active
              active={isActive}
              isExpanded={isExpanded}
              sx={{
                minHeight: 40,
                mb: isExpanded ? 0 : -3,
                justifyContent: isExpanded ? "initial" : "center",
                position: "relative",
                "&:hover .MuiListItemIcon-root, &:hover .MuiTypography-root": {
                  color: `${themeColors.pantone.main} !important`,
                  transition: "color 300ms ease",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isExpanded ? 1.5 : "auto",
                  justifyContent: "center",
                  mt: 0.5,
                  height: "20px",
                  width: "20px",
                  transition: "filter 300ms ease",
                  "& img": {
                    filter: isActive
                      ? "invert(42%) sepia(92%) saturate(964%) hue-rotate(11deg) brightness(91%) contrast(98%)"
                      : "none",
                  },
                  "&:hover img": {
                    filter:
                      "invert(42%) sepia(92%) saturate(964%) hue-rotate(11deg) brightness(91%) contrast(98%)",
                  },
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={
                  <Typography
                    variant="captionLight"
                    sx={{
                      fontSize: 11,
                      opacity: isExpanded ? 1 : 0,
                      color: isActive
                        ? themeColors.pantone.main
                        : themeColors.text.primary,
                      transition: "color 300ms ease, opacity 300ms ease",
                    }}
                  >
                    {item.title}
                  </Typography>
                }
                sx={{ opacity: isExpanded ? 1 : 0 }}
              />
              {isExpanded && item?.child?.length && (
                <ArrowForwardIosIcon
                  sx={{
                    position: "absolute",
                    right: 40,
                    fontSize: 10,
                    mt: 0.5,
                    color: isActive
                      ? themeColors.pantone.main
                      : themeColors.text.primary,
                    transition: "color 300ms ease",
                  }}
                />
              )}
            </StyledListItem>
          );
        })}
      </List>

      <List sx={{ mt: "auto", mb: 2 }}>
        {sidebarItems.slice(5).map((item) => {
          const isActive = activeItem === item.id;
          return (
            <StyledListItem
              key={item.id}
              button
              onClick={() => handleItemClick(item.id)} // ✅ click sets active
              active={isActive}
              isExpanded={isExpanded}
              sx={{
                minHeight: 40,
                mb: isExpanded ? 0 : -0.5,
                justifyContent: isExpanded ? "initial" : "center",
                position: "relative",
                "&:hover .MuiListItemIcon-root, &:hover .MuiTypography-root": {
                  color: `${themeColors.pantone.main} !important`,
                  transition: "color 300ms ease",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mt: 0.6,
                  mr: isExpanded ? 1.5 : "auto",
                  justifyContent: "center",
                  color: isActive
                    ? themeColors.pantone.main
                    : themeColors.text.primary,
                  height: "20px",
                  width: "20px",
                  transition: "color 300ms ease",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="captionLight"
                    sx={{
                      fontSize: 11,

                      opacity: isExpanded ? 1 : 0,
                      color: isActive
                        ? themeColors.pantone.main
                        : themeColors.text.primary,
                      transition: "color 300ms ease, opacity 300ms ease",
                    }}
                  >
                    {item.title}
                  </Typography>
                }
                sx={{ opacity: isExpanded ? 1 : 0 }}
              />
            </StyledListItem>
          );
        })}
      </List>
    </StyledSidebar>
  );
};

export default Sidebar;
