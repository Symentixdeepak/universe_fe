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
  Collapse,
} from "@mui/material";
import { useThemeColors } from "@/hooks";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSidebar } from "@/contexts/SideBarContext";

// Icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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
  children?: ChildItem[];
}

interface ChildItem {
  id: number;
  title: string;
  path: string;
}

const SIDEBAR_WIDTH_EXPANDED = 185;
const SIDEBAR_WIDTH_COLLAPSED = 60;

const childItems: ChildItem[] = [
  { id: 1, title: "Sub Item 1", path: "/user/dashboard/sub1" },
  { id: 2, title: "Sub Item 2", path: "/user/dashboard/sub2" },
  { id: 3, title: "Sub Item 3", path: "/user/dashboard/sub3" },
];

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
    path: "/user/dashboard",
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
    path: "/user/connections",
    children: childItems,
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
    path: "/user/my-universe",
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
    easing: theme.transitions.easing.easeInOut, // Smoother easing
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
  const router = useRouter();
  const { openSidebar, closeSidebar } = useSidebar();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Function to check if current path matches item path
  const isPathActive = (itemPath: string) => {
    const currentPath = router.asPath;
    const pathSegments = currentPath.split('/').filter(Boolean);
    const itemSegments = itemPath.split('/').filter(Boolean);
    
    // For root path
    if (itemPath === '/' && currentPath === '/') {
      return true;
    }
    
    // Check if current path includes the item path segments
    return itemSegments.every((segment, index) => pathSegments[index] === segment);
  };

  const handleItemClick = (item: SidebarItem) => {
    if (item.id === "search") {
      // Open sidebar when search is clicked
      openSidebar();
      return;
    }

    if (item.children && item.children.length > 0) {
      // Open sidebar and toggle expand/collapse for items with children
      openSidebar();
      setExpandedItems(prev => 
        prev.includes(item.id) 
          ? prev.filter(id => id !== item.id)
          : [...prev, item.id]
      );
    } else {
      // Navigate to path for items without children and close sidebar
      router.push(item.path);
      closeSidebar();
    }
  };

  const handleChildClick = (childItem: ChildItem) => {
    // Navigate to child path and close sidebar
    router.push(childItem.path);
    closeSidebar();
  };

  const handleSearchItemClick = () => {
    // Close sidebar after search item selection
    closeSidebar();
  };

  const isItemExpanded = (itemId: string) => expandedItems.includes(itemId);

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
                  onClick={() => handleItemClick(item)}
                  isExpanded={isExpanded}
                  sx={{
                    minHeight: 40,
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
                      mt:-0.5,
                      justifyContent: "center",
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
                  
                  {/* Enhanced TextField with better transitions */}
                  <Box
                    sx={{
                      width: isExpanded ? "auto" : 0,
                      overflow: "hidden",
                      transition: (theme) =>
                        theme.transitions.create(["width", "opacity"], {
                          duration: theme.transitions.duration.standard,
                          easing: theme.transitions.easing.easeInOut,
                          delay: isExpanded ? "150ms" : "0ms", // Delay appearance to prevent breaking
                        }),
                    }}
                  >
                    <TextField
                      variant="outlined"
                      placeholder="Search"
                      onClick={handleSearchItemClick}
                      sx={{
                        opacity: isExpanded ? 1 : 0,
                        height: 20,
                        width: isExpanded ? "120px" : "0px",
                        transition: (theme) =>
                          theme.transitions.create(["opacity", "width"], {
                            duration: theme.transitions.duration.standard,
                            easing: theme.transitions.easing.easeInOut,
                            delay: isExpanded ? "200ms" : "0ms", // Delay to prevent breaking
                          }),
                        "& .MuiOutlinedInput-root": {
                          height: 20,
                        },
                        "& input": {
                          padding: "0 8px",
                          fontSize: 10,
                        },
                      }}
                    />
                  </Box>
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

          const isActive = isPathActive(item.path);
          const expanded = isItemExpanded(item.id);

          return (
            <React.Fragment key={item.id}>
              <StyledListItem
                onClick={() => handleItemClick(item)}
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
                
                {isExpanded && item?.children?.length && (
                  <>
                    {expanded ? (
                      <KeyboardArrowUpIcon
                        sx={{
                          position: "absolute",
                          right: 40,
                          fontSize: 14,
                          mt: 0.5,
                          color: isActive
                            ? themeColors.pantone.main
                            : themeColors.text.primary,
                          transition: "color 300ms ease",
                        }}
                      />
                    ) : (
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
                  </>
                )}
              </StyledListItem>

              {/* Collapsible children */}
              {isExpanded && item.children && (
                <Collapse  sx={{mt:-2.5,mb:2}} in={expanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <StyledListItem
                        key={child.id}
                        onClick={() => handleChildClick(child)}
                        sx={{
                 
                          pl: 6,
                          mb: -3,
                          justifyContent: "initial",
                          "&:hover .MuiTypography-root": {
                            color: `${themeColors.pantone.main} !important`,
                            transition: "color 300ms ease",
                          },
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              variant="captionLight"
                              sx={{
                                fontSize: 10,
                                color: themeColors.grey.main,
                                transition: "color 300ms ease",
                              }}
                            >
                              {child.title}
                            </Typography>
                          }
                        />
                      </StyledListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>

      <List sx={{ mt: "auto", mb: 2 }}>
        {sidebarItems.slice(5).map((item) => {
          const isActive = isPathActive(item.path);
          return (
            <StyledListItem
              key={item.id}
              onClick={() => handleItemClick(item)}
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
                "&:hover img": {
                  filter: "invert(42%) sepia(92%) saturate(964%) hue-rotate(11deg) brightness(91%) contrast(98%)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mt: 0.6,
                  mr: isExpanded ? 1.5 : "auto",
                  justifyContent: "center",
                  height: "20px",
                  width: "20px",
                  transition: "filter 300ms ease",
                  "& img": {
                    filter: isActive
                      ? "invert(42%) sepia(92%) saturate(964%) hue-rotate(11deg) brightness(91%) contrast(98%)"
                      : "none",
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
            </StyledListItem>
          );
        })}
      </List>
    </StyledSidebar>
  );
};

export default Sidebar;
