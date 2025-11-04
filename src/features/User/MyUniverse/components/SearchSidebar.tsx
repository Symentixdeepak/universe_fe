import React, { useState } from "react";
import {
  Box,
  Typography,
  InputAdornment,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TextField, SvgIcon } from "@/components";
import { useThemeColors } from "@/hooks";
import { useRouter } from "next/router";
import Image from "next/image";

interface Connection {
  id: string;
  name: string;
  connectedVia: string;
  timeAgo: string;
  avatar: string;
}

interface SearchSidebarProps {
  connections?: Connection[];
  selectedConnectionId?: string;
  onConnectionSelect?: (connectionId: string) => void;
}

const SearchSidebar: React.FC<SearchSidebarProps> = ({
  connections = [
    {
      id: "1",
      name: "Dr. Maya K.",
      connectedVia: "UniVerse",
      timeAgo: "1 hour ago",
      avatar: "/dr_maya.png",
    },
    {
      id: "2",
      name: "Alejandro Burke",
      connectedVia: "David Batani",
      timeAgo: "4 days ago",
      avatar: "/dr_maya.png",
    },
  ],
  selectedConnectionId,
  onConnectionSelect,
}) => {
  const themeColors = useThemeColors();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchValue, setSearchValue] = useState("");

  const handleConnectionClick = (connectionId: string) => {
    // Call the parent callback if provided
    onConnectionSelect?.(connectionId);

    // Navigate on both mobile and desktop
    if (isMobile) {
      // Use shallow routing on mobile for smoother UX
      router.push(`/user/my-universe/${connectionId}`, undefined, {
        shallow: true,
      });
    } else {
      router.push(`/user/my-universe/${connectionId}`);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        background: themeColors.white.main,
        overflow: "hidden",
      }}
    >
      {/* Search Header */}
      <Box>
        <TextField
          fullWidth
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon name="search_nav" width={20} height={20} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Connections List */}
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <List sx={{ mt: 1 }}>
          {connections.map((connection) => {
            const isSelected = selectedConnectionId === connection.id;
            return (
              <ListItem
                key={connection.id}
                sx={{
                  padding: { xs: "4px 2px 4px 2px", md: "4px 16px 4px 16px" },
                  cursor: "pointer",
                  mb: 0.5,
                  borderRadius: "15px",
                  bgcolor: isSelected ? themeColors.white.dark : "transparent",
                  "&:hover": {
                    bgcolor: themeColors.white.dark,
                  },
                }}
                onClick={() => handleConnectionClick(connection.id)}
              >
                <ListItemAvatar>
                  <Avatar
                    src={connection.avatar}
                    alt={connection.name}
                    sx={{ width: 60, height: 60, mr: 2.5, mt: 0.5 }}
                  />
                </ListItemAvatar>

                <ListItemText>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="bodyRegular"
                      sx={{
                        color: themeColors.text.primary,
                      }}
                    >
                      {connection.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.6,
                      }}
                    >
                      <Typography
                        variant="subtitleLight"
                        sx={{
                          color: themeColors.text.secondary,
                          visibility: { xs: "hidden", md: "visible" },
                        }}
                      >
                        32 m
                      </Typography>

                      <IconButton>
                        <SvgIcon name="three_dot" width={20} height={20} />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <Typography
                        variant="subtitleLight"
                        noWrap
                        sx={{
                          display: "block",
                          maxWidth: 200,
                          color: themeColors.text.secondary,
                          mt: -0.5,
                        }}
                      >
                        Hello, how’s it going?
                      </Typography>
                      <Typography
                        variant="captionLight"
                        sx={{
                          color: themeColors.text.secondary,
                          display: { xs: "flex", md: "none" },
                        }}
                      >
                        30 minutes ago
                      </Typography>
                    </div>

                    <Badge
                      badgeContent={
                        <Typography
                          variant="subtitleRegular"
                          sx={{ color: themeColors.white.main }}
                        >
                          2
                        </Typography>
                      }
                      sx={{ mr: 2.3 }}
                      color="primary"
                    ></Badge>
                  </Box>
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default SearchSidebar;
