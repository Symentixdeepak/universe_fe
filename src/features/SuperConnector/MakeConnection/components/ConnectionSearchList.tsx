import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { TextField } from "@/components";
import { useThemeColors } from "@/hooks";
import { Connection } from "../types";
import { useConnectionSearch } from "../context";

interface ConnectionSearchListProps {
  connections: Connection[];
  onConnectionSelect: (connection: Connection) => void;
  onClose: () => void;
}

export const ConnectionSearchList: React.FC<ConnectionSearchListProps> = ({
  connections,
  onConnectionSelect,
  onClose,
}) => {
  const themeColors = useThemeColors();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isConnectionSelected } = useConnectionSearch();

  return (
    <Box
      sx={{
        maxWidth: 500,
        padding: "20px",
        background: themeColors.white.dark,
        borderRadius: "15px",
        overflow: "hidden",
        mb: 15,
      }}
    >
      <TextField
        size="small"
        fullWidth
        placeholder="Search Connections"
        sx={{
          mb: 1.5,
          "& .MuiOutlinedInput-root": {
            height: "31px",
          },
        }}
      />
      <List sx={{ mt: 1, p: 0, overflowY: "auto" }}>
        {connections.map((connection, index) => {
          const isSelected = isConnectionSelected(connection.id);

          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.3,
                mb: 1,
                opacity: isSelected ? 0.5 : 1,
                cursor: isSelected ? "not-allowed" : "pointer",
              }}
              key={connection.id}
              onClick={() => {
                if (!isSelected) {
                  onConnectionSelect(connection);
                }
              }}
            >
              <Avatar
                src={connection.avatarUrl}
                alt={connection.name}
                sx={{
                  width: 38,
                  height: 38,
                }}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="bodyLight"
                  sx={{ color: themeColors.text.secondary }}
                >
                  {connection.name}
                </Typography>
                <Box sx={{ mt: -1.2 }}>
                  <Typography
                    variant="captionLight"
                    noWrap
                    sx={{
                      color: themeColors.text.secondary,
                    }}
                  >
                    {connection.description}
                  </Typography>
                  {connections.length - 1 !== index && (
                    <Box
                      sx={{
                        borderBottom: `1px solid ${themeColors.grey.main}`,
                        mt: 0.5,
                      }}
                    ></Box>
                  )}
                </Box>
              </Box>
            </Box>
          );
        })}
      </List>
    </Box>
  );
};

export default ConnectionSearchList;
