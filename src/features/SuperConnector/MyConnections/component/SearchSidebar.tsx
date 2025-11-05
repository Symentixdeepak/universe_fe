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
  AvatarGroup,
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
  timeAgo?: string;
  connect_on?: string;
  avatar: string;
  status?: "accepted" | "pending";
}

interface SearchSidebarProps {
  connections?: Connection[];
  selectedConnectionId?: string;
  onConnectionSelect?: (connectionId: string) => void;
  onStatusChange?: (status: "accepted" | "pending") => void;
}

const SearchSidebar: React.FC<SearchSidebarProps> = ({
  connections = [
    {
      id: "1",
      name: "David and Sabrina",
      connectedVia: "UniVerse",
      connect_on: "You connected them on 17/10/2025",
      avatar: "/dr_maya.png",
      status: "accepted",
    },
    {
      id: "2",
      name: "Ross, Monica and Joey",
      connectedVia: "David Batani",
      connect_on: "You connected them on 10/10/2025",
      avatar: "/dr_maya.png",
      status: "pending",
    },
  ],
  selectedConnectionId,
  onConnectionSelect,
  onStatusChange,
}) => {
  const themeColors = useThemeColors();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<"accepted" | "pending">(
    "accepted"
  );

  const handleConnectionClick = (connectionId: string) => {
    // Call the parent callback if provided
    onConnectionSelect?.(connectionId);

    // Navigate on both mobile and desktop
    if (isMobile) {
      // Use shallow routing on mobile for smoother UX
      router.push(`/superconnector/connections/${connectionId}`, undefined, {
        shallow: true,
      });
    } else {
      router.push(`/superconnector/connections/${connectionId}`);
    }
  };

  const handleStatusChange = (status: string) => {
    const newStatus = status as "accepted" | "pending";
    setStatusFilter(newStatus);

    // Remove selected connection and redirect to base route
    router.push("/superconnector/connections", undefined, { shallow: true });

    // Call parent callback to update data
    onStatusChange?.(newStatus);
  };

  // Filter connections based on status
  const filteredConnections = connections.filter(
    (connection) => connection.status === statusFilter
  );

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
          {filteredConnections.map((connection) => {
            const isSelected = selectedConnectionId === connection.id;
            return (
              <ListItem
                key={connection.id}
                sx={{
                  padding: { xs: "4px 2px 4px 2px", md: "4px 16px 4px 16px" },
                  cursor: "pointer",
                  // mb: 0.5,
                  borderRadius: "15px",
                  bgcolor: isSelected ? themeColors.white.dark : "transparent",
                  "&:hover": {
                    bgcolor: themeColors.white.dark,
                  },
                }}
                onClick={() => handleConnectionClick(connection.id)}
              >
                <ListItemAvatar>
                  <AvatarGroup
                    sx={{
                      ["& .MuiAvatarGroup-avatar"]: {
                        borderColor: themeColors.white.dark,
                      },
                      mr: 2.5,
                      mt: 0.5,
                    }}
                    spacing={connection.id === "2" ? 12 : 15}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      sx={{
                        outline: "none",
                        height: connection.id === "2" ? 26 : 37,
                        width: connection.id === "2" ? 26 : 37,
                      }}
                      src="/assets/images/sample/sample-media-1.png"
                    />
                    <Avatar
                      alt="Travis Howard"
                      sx={{
                        outline: "none",
                        height: connection.id === "2" ? 26 : 37,
                        width: connection.id === "2" ? 26 : 37,
                      }}
                      src="/assets/images/sample/sample-media-2.png"
                    />
                    {connection.id === "2" && (
                      <Avatar
                        alt="Cindy Baker"
                        sx={{ outline: "none", height: 26, width: 26 }}
                        src="/assets/images/sample/sample-media-3.png"
                      />
                    )}
                  </AvatarGroup>
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

                    <IconButton>
                      <SvgIcon name="three_dot" width={20} height={20} />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="captionLight"
                      sx={{
                        color: themeColors.text.secondary,
                      }}
                    >
                      {connection.connect_on}
                    </Typography>
                  </Box>
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Status Filter ButtonGroup - Fixed at bottom */}
              <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          backgroundColor: themeColors.white.main,
          borderTop: `1px solid ${themeColors.white.dark}`,
       
        }}
      >

          <ButtonGroup
            options={[
              { value: "accepted", label: "Accepted" },
              { value: "pending", label: "Pending" },
            ]}
            value={statusFilter}
            onChange={handleStatusChange}
          />
      </Box>
        </div>
    </Box>
  );
};

export default SearchSidebar;
