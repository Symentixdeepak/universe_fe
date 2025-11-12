import React from "react";
import { Box, Typography, Avatar, Badge } from "@mui/material";
import { useThemeColors } from "@/hooks";

interface NotificationItemProps {
  id: string;
  avatar: string;
  title: string;
  subtitle: string;
  time: string;
  isUnread?: boolean;
  onClick?: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  avatar,
  title,
  subtitle,
  time,
  isUnread = false,
  onClick,
}) => {
  const themeColors = useThemeColors();

  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "12px 16px",
        cursor: "pointer",
        backgroundColor: isUnread ? themeColors.white.dark : "transparent",
        "&:hover": {
          backgroundColor: themeColors.white.dark,
        },
        borderBottom: `1px solid ${themeColors.grey.light}`,
      }}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        sx={{
          "& .MuiBadge-dot": {
            display: isUnread ? "block" : "none",
            backgroundColor: themeColors.pantone.main,
            width: 8,
            height: 8,
            borderRadius: "50%",
          },
        }}
      >
        <Avatar src={avatar} alt={title} sx={{ width: 48, height: 48 }} />
      </Badge>

      <Box sx={{ flex: 1, ml: 2, minWidth: 0 }}>
        <Typography
          variant="bodyRegular"
          sx={{
            color: themeColors.text.primary,
            fontWeight: isUnread ? 600 : 400,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="captionLight"
          sx={{
            color: themeColors.text.secondary,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      <Box sx={{ ml: 1, flexShrink: 0 }}>
        <Typography
          variant="captionLight"
          sx={{
            color: themeColors.text.secondary,
            fontSize: "10px",
          }}
        >
          {time}
        </Typography>
        {isUnread && (
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: themeColors.pantone.main,
              ml: "auto",
              mt: 0.5,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default NotificationItem;
