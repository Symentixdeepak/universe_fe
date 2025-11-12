import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import {
  ProfileAboutFooter,
  ProfileDetails,
  ProfileHeader,
} from "../../PendingConnections/components";

const ShowProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: isMobile ? "25px" : "40px",
        width: isMobile ? "100%" : "auto",
      }}
    >
      {/* Profile Header */}
      <ProfileHeader
        name="Dr. Maya K."
        location="San Francisco, CA"
        description="Building AI solutions that make healthcare smarter and more human."
        connectedVia="Aelia Kos"
        avatar="/dr_maya.png"
        connectedSince="Dec 2024"
      />

      {/* Profile Details */}
      <ProfileDetails />

      {/* Profile About Footer */}
      <ProfileAboutFooter />
    </Box>
  );
};

export default ShowProfile;
