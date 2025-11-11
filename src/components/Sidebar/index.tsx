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
  useMediaQuery,
  Backdrop,
} from "@mui/material";
import { useThemeColors } from "@/hooks";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useSidebar } from "@/contexts/SideBarContext";

// Icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TextField from "../TextField";
import {
  ChildItem,
  SIDEBAR_WIDTH_COLLAPSED,
  SIDEBAR_WIDTH_EXPANDED,
  SidebarItem,
  sidebarItemsSuperConnector,
  sidebarItemsUser,
} from "./SideBarItems";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  isExpanded?: boolean;
  onToggle?: () => void;
}

const StyledSidebar = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isExpanded" && prop !== "isMobile",
})<{ isExpanded: boolean; isMobile: boolean }>(
  ({ theme, isExpanded, isMobile }) => ({
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    width: isExpanded ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED,
    transform: isMobile && !isExpanded ? "translateX(-100%)" : "translateX(0)",
    transition: theme.transitions.create(["width", "transform"], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    zIndex: isMobile ? theme.zIndex.modal : theme.zIndex.drawer,
  })
);

const StyledListItem = styled(ListItem)<{
  active?: boolean;
  isExpanded?: boolean;
}>(({ theme, active, isExpanded }) => ({
  marginBottom: theme.spacing(0.5),
  borderRadius: theme.spacing(1),
  marginLeft: theme.spacing(0.5),
  marginRight: theme.spacing(0.5),
  cursor: "pointer",
  position: "relative",
  "&:hover": {
    backgroundColor: "transparent",
  },
  "&:active": {
    backgroundColor: "transparent",
  },
}));

export const Sidebar: React.FC<SidebarProps> = ({
  isExpanded = true,
  onToggle,
}) => {
  const theme = useTheme();
  const themeColors = useThemeColors();
  const router = useRouter();
  const { user } = useAuth();
  const { openSidebar, closeSidebar } = useSidebar();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const sidebarItems =
    user?.role === "superconnector"
      ? sidebarItemsSuperConnector
      : sidebarItemsUser;
  const elementToShow = user?.role === "superconnector" ? 4 : 5;

  const isPathActive = (itemPath: string) => {
    const currentPath = router.asPath;
    const pathSegments = currentPath.split("/").filter(Boolean);
    const itemSegments = itemPath.split("/").filter(Boolean);

    // For root path
    if (itemPath === "/" && currentPath === "/") {
      return true;
    }

    // Check if current path includes the item path segments
    return itemSegments.every(
      (segment, index) => pathSegments[index] === segment
    );
  };

  const handleItemClick = (item: SidebarItem) => {
    setClickedItem(item.id);
    // Reset click state after a short delay
    setTimeout(() => {
      setClickedItem(null);
    }, 150);

    // Handle sidebar open/close based on flags
    if (item.closeSidebarOnClick && isExpanded) {
      // If sidebar is open and closeSidebarOnClick is true, close it
      closeSidebar();
      return; // Don't proceed with other actions
    } else if (item.openSidebarOnClick) {
      // Open sidebar if openSidebarOnClick is true
      openSidebar();
    }

    if (item.id === "search") {
      // Open sidebar when search is clicked
      return;
    }

    if (item.children && item.children.length > 0) {
      if (item.isLink) {
        // If isLink is true, navigate to the parent path and expand children
        router.push(item.path, undefined, { shallow: true });
        // Also expand the children to show them
        if (!isExpanded) {
          openSidebar();
        }
        setExpandedItems((prev) =>
          prev.includes(item.id) ? prev : [...prev, item.id]
        );
        // Don't close sidebar when item has children and isLink is true
      } else {
        // If isLink is false, only toggle expand/collapse (no navigation)
        setExpandedItems((prev) =>
          prev.includes(item.id)
            ? prev.filter((id) => id !== item.id)
            : [...prev, item.id]
        );
      }
    } else {
      // For items without children, check isLink flag
      if (item.isLink !== false) {
        // Navigate to path only if isLink is not explicitly false
        router.push(item.path, undefined, { shallow: true });
        closeSidebar();
      }
      // If isLink is false, do nothing (just open sidebar if flag is set)
    }
  };

  const handleExpandToggle = (
    e: React.MouseEvent,
    itemId: string
  ) => {
    e.stopPropagation(); // Prevent parent click
    openSidebar();
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleChildClick = (childItem: ChildItem) => {
    // Navigate to child path and close sidebar
    router.push(childItem.path, undefined, { shallow: true });
    closeSidebar();
  };

  const handleSearchItemClick = () => {
    // Close sidebar after search item selection
    closeSidebar();
  };

  const isItemExpanded = (itemId: string) => expandedItems.includes(itemId);

  // Function to get color based on item state
  const getItemColor = (
    item: SidebarItem,
    isHovered: boolean,
    isClicked: boolean,
    isExpanded?: boolean
  ) => {
    const isActive = isPathActive(item.path);

    if (isActive || isExpanded) {
      return themeColors.pantone.main; // Selected state or expanded state
    }
    if (isClicked) {
      return themeColors.pantone.dark; // Click state
    }
    if (isHovered) {
      return themeColors.pantone.light; // Hover state
    }
    return themeColors.text.primary; // Default state
  };

  // Function to get arrow color
  const getArrowColor = (
    item: SidebarItem,
    isHovered: boolean,
    isClicked: boolean,
    isExpanded?: boolean
  ) => {
    const isActive = isPathActive(item.path);

    if (isActive || isExpanded) {
      return themeColors.pantone.main;
    }
    if (isClicked) {
      return themeColors.pantone.dark;
    }
    if (isHovered) {
      return themeColors.pantone.light;
    }
    return themeColors.text.primary;
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isExpanded && (
        <Backdrop
          open={isExpanded}
          onClick={closeSidebar}
          sx={{
            zIndex: theme.zIndex.modal - 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
      )}

      <StyledSidebar
        isExpanded={isExpanded}
        isMobile={isMobile}
        sx={{
          backgroundColor: themeColors.white.dark,
        }}
      >
        <List sx={{ pt: 2 }}>
          {sidebarItems.slice(0, elementToShow).map((item) => {
            if (item.id === "search") {
              const IconComponent = item.iconComponent;
              const isHovered = hoveredItem === item.id;
              const isClicked = clickedItem === item.id;
              const iconColor = getItemColor(item, isHovered, isClicked);

              return (
                <React.Fragment key={item.id}>
                  <StyledListItem
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    isExpanded={isExpanded}
                    sx={{
                      minHeight: 40,
                      mt: isExpanded ? 3 : 5.5,
                      mb: isExpanded ? 3 : 2,
                      justifyContent: isExpanded ? "initial" : "center",
                      position: "relative",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: isExpanded ? 1.5 : "auto",
                        mt: -0.5,
                        justifyContent: "center",
                        height: "20px",
                        width: "20px",
                      }}
                    >
                      <IconComponent color={iconColor} width={20} height={20} />
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
            const IconComponent = item.iconComponent;
            const isHovered = hoveredItem === item.id;
            const isClicked = clickedItem === item.id;
            const iconColor = getItemColor(
              item,
              isHovered,
              isClicked,
              expanded
            );
            const textColor = getItemColor(
              item,
              isHovered,
              isClicked,
              expanded
            );
            const arrowColor = getArrowColor(
              item,
              isHovered,
              isClicked,
              expanded
            );

            return (
              <React.Fragment key={item.id}>
                <StyledListItem
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  active={isActive}
                  isExpanded={isExpanded}
                  sx={{
                    minHeight: 40,
                    mb: isExpanded ? 0 : -3,
                    justifyContent: isExpanded ? "initial" : "center",
                    position: "relative",
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
                    }}
                  >
                    <IconComponent color={iconColor} width={20} height={20} />
                  </ListItemIcon>

                  <ListItemText
                    primary={
                      <Typography
                        variant="captionLight"
                        sx={{
                          fontSize: 11,
                          opacity: isExpanded ? 1 : 0,
                          color: textColor,
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
                        <KeyboardArrowDownIcon
                          onClick={(e) =>
                            item.isLink ? handleExpandToggle(e, item.id) : undefined
                          }
                          sx={{
                            position: "absolute",
                            right: 40,
                            fontSize: 14,
                            mt: 0.5,
                            color: arrowColor,
                            transition: "color 300ms ease",
                            cursor: item.isLink ? "pointer" : "default",
                          }}
                        />
                      ) : (
                        <ArrowForwardIosIcon
                          onClick={(e) =>
                            item.isLink ? handleExpandToggle(e, item.id) : undefined
                          }
                          sx={{
                            position: "absolute",
                            right: 40,
                            fontSize: 10,
                            mt: 0.5,
                            color: arrowColor,
                            transition: "color 300ms ease",
                            cursor: item.isLink ? "pointer" : "default",
                          }}
                        />
                      )}
                    </>
                  )}
                </StyledListItem>

                {/* Collapsible children */}
                {isExpanded && item.children && (
                  <Collapse
                    sx={{ mt: -2.5, mb: 2 }}
                    in={expanded}
                    timeout="auto"
                    unmountOnExit
                  >
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

        {user?.role === "superconnector" && (
          <List sx={{ pt: 2 }}>
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
            {sidebarItems.slice(4, 7).map((item) => {
              const isActive = isPathActive(item.path);
              const expanded = isItemExpanded(item.id);
              const IconComponent = item.iconComponent;
              const isHovered = hoveredItem === item.id;
              const isClicked = clickedItem === item.id;
              const iconColor = getItemColor(
                item,
                isHovered,
                isClicked,
                expanded
              );
              const textColor = getItemColor(
                item,
                isHovered,
                isClicked,
                expanded
              );
              const arrowColor = getArrowColor(
                item,
                isHovered,
                isClicked,
                expanded
              );

              return (
                <React.Fragment key={item.id}>
                  <StyledListItem
                    onClick={() => handleItemClick(item)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    active={isActive}
                    isExpanded={isExpanded}
                    sx={{
                      minHeight: 40,
                      mb: isExpanded ? 0 : -3,
                      justifyContent: isExpanded ? "initial" : "center",
                      position: "relative",
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
                      }}
                    >
                      <IconComponent color={iconColor} width={20} height={20} />
                    </ListItemIcon>

                    <ListItemText
                      primary={
                        <Typography
                          variant="captionLight"
                          sx={{
                            fontSize: 11,
                            opacity: isExpanded ? 1 : 0,
                            color: textColor,
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
                          <KeyboardArrowDownIcon
                            onClick={(e) =>
                              item.isLink ? handleExpandToggle(e, item.id) : undefined
                            }
                            sx={{
                              position: "absolute",
                              right: 40,
                              fontSize: 14,
                              mt: 0.5,
                              color: arrowColor,
                              transition: "color 300ms ease",
                              cursor: item.isLink ? "pointer" : "default",
                            }}
                          />
                        ) : (
                          <ArrowForwardIosIcon
                            onClick={(e) =>
                              item.isLink ? handleExpandToggle(e, item.id) : undefined
                            }
                            sx={{
                              position: "absolute",
                              right: 40,
                              fontSize: 10,
                              mt: 0.5,
                              color: arrowColor,
                              transition: "color 300ms ease",
                              cursor: item.isLink ? "pointer" : "default",
                            }}
                          />
                        )}
                      </>
                    )}
                  </StyledListItem>

                  {/* Collapsible children */}
                  {isExpanded && item.children && (
                    <Collapse
                      sx={{ mt: -2.5, mb: 2 }}
                      in={expanded}
                      timeout="auto"
                      unmountOnExit
                    >
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
        )}

        <List sx={{ mt: "auto", mb: 2 }}>
          {sidebarItems
            .slice(user?.role === "superconnector" ? 7 : 5)
            .map((item) => {
              const isActive = isPathActive(item.path);
              const IconComponent = item.iconComponent;
              const isHovered = hoveredItem === item.id;
              const isClicked = clickedItem === item.id;
              const iconColor = getItemColor(item, isHovered, isClicked);
              const textColor = getItemColor(item, isHovered, isClicked);

              return (
                <StyledListItem
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  active={isActive}
                  isExpanded={isExpanded}
                  sx={{
                    minHeight: 40,
                    mb: isExpanded ? 0 : -0.5,
                    justifyContent: isExpanded ? "initial" : "center",
                    position: "relative",
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
                    }}
                  >
                    <IconComponent color={iconColor} width={20} height={20} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="captionLight"
                        sx={{
                          fontSize: 11,
                          opacity: isExpanded ? 1 : 0,
                          color: textColor,
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
    </>
  );
};

export default Sidebar;
