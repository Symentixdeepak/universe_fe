import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useThemeColors } from "@/hooks";
import { SvgIcon, IconName } from "@/components";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import {
  ProfileIcon,
  SettingNavIcon,
  NotificationNavIcon,
  SignoutIcon,
} from "./Icons";
import { useUser } from "@/contexts";

interface ProfileMenuItem {
  id: string;
  label: string;
  icon: "profile" | "setting_nav" | "notification_nav" | "signout";
  color?: string;
  onClick?: () => void;
}

interface ProfilePopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  userName?: string;
  userAvatar?: string;
  isMobile: boolean;
}

export const ProfilePopover: React.FC<ProfilePopoverProps> = ({
  open,
  anchorEl,
  onClose,
  isMobile,
  userAvatar,
  userName,
}) => {
  const themeColors = useThemeColors();
  const { logout } = useAuth();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const renderIcon = (iconName: string, itemId: string) => {
    const isHovered = hoveredItem === itemId;
    const isActive = activeItem === itemId;
    const isSignout = itemId === "sign-out";

    let iconColor = themeColors.text.primary;

    if (isSignout) {
      iconColor = "#BE0000";
    } else if (isActive) {
      iconColor = themeColors.pantone.main;
    } else if (isHovered) {
      iconColor = themeColors.pantone.light;
    }

    const iconProps = {
      color: iconColor,
      width: 17,
      height: 17,
    };

    switch (iconName) {
      case "profile":
        return <ProfileIcon {...iconProps} />;
      case "setting_nav":
        return <SettingNavIcon {...iconProps} />;
      case "notification_nav":
        return <NotificationNavIcon {...iconProps} />;
      case "signout":
        return <SignoutIcon {...iconProps} />;
      default:
        return null;
    }
  };
  const menuItems: ProfileMenuItem[] = [
    {
      id: "view-profile",
      label: "View Profile",
      icon: "profile",
      onClick: () => {
        console.log("View Profile clicked");
        onClose();
      },
    },
    {
      id: "manage-account",
      label: "Manage Account",
      icon: "setting_nav",
      onClick: () => {
        console.log("Manage Account clicked");
        onClose();
      },
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: "notification_nav",
      onClick: () => {
        console.log("Notifications clicked");
        onClose();
      },
    },
    {
      id: "sign-out",
      label: "Sign out",
      icon: "signout",
      color: "#BE0000",
      onClick: () => {
        logout();
        onClose();
      },
    },
  ];

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      disableScrollLock={true}
      disableRestoreFocus={true}
      disableAutoFocus={true}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        "& .MuiPopover-paper": {
          mt: -5.8,
          borderRadius: "6px",
          boxShadow: 0,
          ml: 0.5,
          bgcolor: themeColors.white.dark,
          maxWidth: "170px",
          overflow: "visible",
        },
      }}
    >
      <Box sx={{}}>
        {/* User Info Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            justifyContent: "space-between",
            // mb: 2,
            mt: -1,
            padding: "15px",
          }}
        >
          <Typography
            variant="bodyRegular"
            sx={{
              textTransform: "capitalize",
              color: themeColors.pantone.main,
            }}
          >
            {userName}
          </Typography>
          {userAvatar ? (
            <Image
              src="/charactor.png"
              alt="User Avatar"
              width={40}
              height={40}
              style={{
                marginRight: -10,
                objectFit: "cover",
              }}
            />
          ) : (
            <Avatar
              src="/assets/images/avatars/default_avatar.png"
              alt="Default Avatar"
              sx={{ width: 40, height: 40, marginRight: -1 }}
            />
          )}
        </Box>

        {/* Menu Items */}

        <List sx={{ p: 0 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.id}
              onClick={item.onClick}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onMouseDown={() => setActiveItem(item.id)}
              onMouseUp={() => setActiveItem(null)}
              sx={{
                borderRadius: "8px",
                cursor: "pointer",
                mb: -0.5,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  "& .MuiListItemText-primary": {
                    color:
                      item.id === "sign-out"
                        ? item.color
                        : themeColors.pantone.light,
                  },
                },
                "&:active": {
                  "& .MuiListItemText-primary": {
                    color:
                      item.id === "sign-out"
                        ? item.color
                        : themeColors.pantone.main,
                  },
                },
                "&:last-child": {
                  mb: 0,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "32px",
                }}
              >
                {renderIcon(item.icon, item.id)}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  variant: "subtitleLight",
                  sx: {
                    color: themeColors.text.primary,
                    transition: "color 0.2s ease-in-out",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Popover>
  );
};

export default ProfilePopover;
