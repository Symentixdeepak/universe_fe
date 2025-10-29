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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TextField } from "@/components";
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
  const [searchValue, setSearchValue] = useState("");

  const handleConnectionClick = (connectionId: string) => {
    // Call the parent callback if provided
    onConnectionSelect?.(connectionId);
    
    // Navigate to the user's profile using router.push
    router.push(`/user/my-universe/${connectionId}`);
  };

  return (
    <Box
      sx={{
        width: 370,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
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
                <Image
                  src="/assets/images/icons/search_nav.svg"
                  alt="Search"
                  height={20}
                  width={20}
                />
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
                  padding: "4px 16px 4px 16px",
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

                        //   mb: 0.5,
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 0.6,
                  }}
                >
                  <IconButton>
                    <Image
                      src="/assets/images/icons/cross.svg"
                      height={20}
                      width={20}
                    />
                  </IconButton>
                  <IconButton>
                    <Image
                      src="/assets/images/icons/clock_reminder.svg"
                      height={20}
                      width={20}
                    />
                  </IconButton>
                </Box>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default SearchSidebar;
