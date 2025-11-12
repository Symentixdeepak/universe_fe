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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TextField, SvgIcon, ButtonGroup } from "@/components";
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

  const statusFilter = (router.query.pending === "true"
    ? "pending"
    : "accepted") as string;

  const handleStatusChange = (value: string) => {
    const currentPath = "/user/pending_connections";

    const { id, ...queryWithoutId } = router.query;

    if (value === "pending") {
      queryWithoutId.pending = "true";
    } else {
      delete queryWithoutId.pending;
    }

    router.push(
      {
        pathname: currentPath,
        query: queryWithoutId,
      },
      undefined,
      { shallow: true }
    );
  };

  const handleConnectionClick = (connectionId: string) => {
    onConnectionSelect?.(connectionId);

    const query = router.query;

    const pathname = `/user/pending_connections/${connectionId}`;

    if (isMobile) {
      router.push({ pathname, query }, undefined, { shallow: true });
    } else {
      router.push({ pathname, query });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: themeColors.white.main,
      }}
    >
      {/* Search Header - Fixed at top */}
      <Box sx={{ padding: "20px 20px 0 20px", flexShrink: 0 }}>
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

      {/* Connections List - Scrollable middle content */}
      <Box 
        sx={{ 
          flex: 1, 
          overflow: "auto",
          padding: "0 20px",
        }}
      >
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
                    sx={{ width: 60, height: 60 }}
                  />
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography
                      variant="bodyRegular"
                      sx={{
                        color: themeColors.text.primary,
                      }}
                    >
                      {connection.name}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        variant="subtitleLight"
                        sx={{
                          display: "block",
                          color: themeColors.text.secondary,
                        }}
                      >
                        Connected via{" "}
                        <Typography
                          variant="subtitleBold"
                          component={"span"}
                          sx={{
                            color: themeColors.pantone.main,
                          }}
                        >
                          {connection.connectedVia}
                        </Typography>
                      </Typography>
                      <Typography
                        sx={{ color: themeColors.text.secondary }}
                        variant="captionLight"
                      >
                        {connection.timeAgo}
                      </Typography>
                    </>
                  }
                  sx={{ ml: 1 }}
                />
                {statusFilter === "accepted" && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: 0.6,
                    }}
                  >
                    <IconButton>
                      <SvgIcon name="cross" width={20} height={20} />
                    </IconButton>
                    <IconButton>
                      <SvgIcon name="clock_reminder" width={20} height={20} />
                    </IconButton>
                  </Box>
                )}
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Status Filter ButtonGroup - Fixed at bottom */}
      <Box
        sx={{
          padding: "10px 20px 20px 20px",
          backgroundColor: themeColors.white.main,
          borderTop: `1px solid ${themeColors.white.dark}`,
          flexShrink: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: { xs: 6, md: 0 },
        }}
      >
        <ButtonGroup
          options={[
            { value: "accepted", label: "Requested" },
            { value: "pending", label: "Pending" },
          ]}
          value={statusFilter}
          onChange={handleStatusChange}
        />
      </Box>
    </Box>
  );
};

export default SearchSidebar;
