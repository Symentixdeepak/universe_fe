import { useThemeColors } from "@/hooks";
import { Avatar, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const MessageData = (message: any) => {
  const themeColors = useThemeColors();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleAvatarClick = () => {
    if (isMobile) {
      // Get current route params
      const currentPath = router.asPath.split('?')[0];
      router.push(`${currentPath}?show_profile=true`, undefined, {
        shallow: true,
      });
    }
  };

  const renderMessage = () => {
    switch (message.type) {
      case "image":
        return (
          <Box
            component="img"
            src={message.image}
            alt="message"
            sx={{
              mt: 0.5,

              borderRadius: "10px",
              objectFit: "cover",
              maxWidth: {xs:210,md:300}, display: "block"
            }}
  
          />
        );

      case "text":
        return (
          <Typography
            variant="bodyRegular"
            sx={{ color: themeColors.text.primary }}
          >
            {message.text}
          </Typography>
        );

      default:
        return (
          <Typography
            variant="bodyRegular"
            sx={{ color: themeColors.text.primary }}
          >
            {message.text}
          </Typography>
        );
    }
  };

  return (
    <Box
      key={message.id}
      sx={{
        display: "flex",
        mb: 1,
        gap: {xs:2,md:1},
      }}
    >
      <Avatar 
        sx={{ 
          height: 70, 
          width: 70,
          cursor: isMobile ? 'pointer' : 'default'
        }} 
        src={message.avatar}
        onClick={handleAvatarClick}
      />
      
      <Box sx={{ flex: 1, minWidth: 0,maxWidth:500 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 1,
            gap: 2,
          }}
        >
          <Typography
            variant="bodyBold"
            sx={{ 
              color: themeColors.text.primary,
              minWidth: 0,
              flex: "0 0 auto"
            }}
          >
            {message.name}
          </Typography>
          
          <Typography
            variant="subtitleRegular"
            sx={{ 
              color: themeColors.grey.main,
              ml: "auto",
              flex: "0 0 auto",
              mr:5,
              whiteSpace: "nowrap"
            }}
          >
            {message.timestamp}
          </Typography>
        </Box>
        
        <Box sx={{ mt: 0.5,maxWidth:400 }}>
          {renderMessage()}
        </Box>
      </Box>
    </Box>
  );
};

export default MessageData;
