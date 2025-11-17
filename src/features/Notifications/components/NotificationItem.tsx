import React from "react";
import { Box, Typography, Avatar, Badge } from "@mui/material";
import { useThemeColors } from "@/hooks";

interface NotificationItemProps {
  id: string;
  avatar: string;
  title: string;
  subtitle: string;
  info?: string;
  time: string;
  isUnread?: boolean;
  isPassive?: boolean;
  onClick?: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  avatar,
  title,
  subtitle,
  time,
  info,
  isUnread = false,
  onClick,
  isPassive = false,
}) => {
  const themeColors = useThemeColors();

  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mr: 1,
        padding: "10px 20px",
        borderRadius: "15px",
        mb: 1,
        cursor: "pointer",
        backgroundColor: isUnread ? themeColors.white.dark : "transparent",
        "&:hover": {
          backgroundColor: themeColors.white.dark,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar
          src={avatar}
          alt={title}
          sx={{
            width: 55,
            height: 55,
            flexShrink: 0,
          }}
        />

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Name */}
            <Typography
              variant="bodyRegular"
              sx={{
                color: themeColors.text.primary,
              }}
            >
              {title}
            </Typography>
          </Box>

          {/* Subtitle */}
          <Typography
            variant="subtitleLight"
            sx={{
              color: themeColors.text.secondary,
              display: "block",
              mb: 0.4,
            }}
          >
            {subtitle}
          </Typography>
          {!isPassive &&
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 5 }}
          >
            <Typography
              variant="captionRegular"
              sx={{
                color: themeColors.text.secondary,
              }}
            >
              {info}
            </Typography>

            {/* Time */}
            <Typography
              variant="captionRegular"
              sx={{
                color: themeColors.text.secondary,
              }}
            >
              {time}
            </Typography>
          </Box>
          }
        </Box>
      </Box>

      {/* Unread Badge 10x10 */}
      {isUnread && (
        <Box
          sx={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            backgroundColor: themeColors.pantone.light,
            flexShrink: 0,
          }}
        />
      )}
    </Box>
  );
};

export default NotificationItem;

