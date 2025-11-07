import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { TextField, Chip } from "@/components";
import { useThemeColors } from "@/hooks";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import SelectUser from "./SelectUser";
import ConnectionConfirmation from "./ConnectionConfirmation";
import { ConnectionSearchProvider, useConnectionSearch } from "../context";

const suggestions = [
  "Search recent connections",
  "Search sales professionals",
  "Search marketing specialists",
];

const SelectConnectionContent = () => {
  const themeColors = useThemeColors();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    searchText,
    showSearchResults,
    selectedConnections,
    setSearchText,
    showConfirmation,
  } = useConnectionSearch();
  // Show confirmation UI when confirmation is triggered

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height:showSearchResults ? "100%" : "100vh",
        px: 2,
        m: "auto",
      }}
    >
      {/* Welcome Text with Gradient */}
      <Typography
        variant="h4Bold"
        sx={{
          background: `linear-gradient(90deg, ${themeColors.pantone.main} 0%, ${themeColors.pantone.light} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textFillColor: "transparent",
          textAlign: "center",
        }}
      >
        Welcome back, Aelia
      </Typography>

      {/* Sub heading */}
      <Typography
        variant="h4Regular"
        sx={{
          color: themeColors.text.primary,
          mb: { xs: 2, md: 5 },
          textAlign: "center",
          mt: -0.6,
          px: { xs: 2, md: 0 },
        }}
      >
        {selectedConnections?.first?.id
          ? "Now Connecting..."
          : "Who would you like to connect today?"}
      </Typography>

      <SelectUser />

      {!showConfirmation && (
        <Box
          sx={{
            width: "100%",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: themeColors.white.main,
          }}
        >
          <TextField
            fullWidth
            placeholder="Search your connections or find a new one"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              endAdornment: (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: themeColors.pantone.main,
                  }}
                >
                  <ArrowCircleRightOutlinedIcon
                    sx={{ fontSize: 24, color: themeColors.pantone.main }}
                  />
                </Box>
              ),
            }}
            sx={{
              // When in search results mode, make it sticky at bottom
              ...(showSearchResults && {
                position: "fixed",
                bottom: 0,
       height:75,
                ml: 4,
                backgroundColor: themeColors.white.main,
                left: 20,
                right: "auto",
                maxWidth: "600px",
                zIndex: theme.zIndex.appBar + 10,
                // Center the fixed input on desktop
                ...(!isMobile && {
                  left: "50%",
                  transform: "translateX(-50%)",
                  right: "auto",
                }),
              }),
            }}
          />
          {showSearchResults && (
            <Box
              sx={{
                position: "fixed",
                textAlign: "center",
                ml: 5,
                left: 0,
                right: 0,
                bottom: 10,
                zIndex: theme.zIndex.appBar + 100,
              }}
            >
              <Typography
                sx={{ color: themeColors.grey.main }}
                textAlign={"center"}
                variant="captionLight"
              >
                The UniVerse will do its best to find the best person for you,
                but your due diligence is advised.
              </Typography>
            </Box>
          )}
          {/* Suggestion Chips */}
          {!showSearchResults && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: { xs: "center", md: "flex-start" },
                alignItems: "center",
                gap: 1,
                width: "100%",
              }}
            >
              {suggestions.map((suggestion) => (
                <Chip
                  key={suggestion}
                  label={suggestion}
                  onClick={() => setSearchText(suggestion)}
                  variant="outlined"
                />
              ))}
            </Box>
          )}
        </Box>
      )}
      {showConfirmation && <ConnectionConfirmation />}
    </Box>
  );
};

export const SelectConnection = () => {
  return (
    <ConnectionSearchProvider>
      <SelectConnectionContent />
    </ConnectionSearchProvider>
  );
};

export default SelectConnection;
