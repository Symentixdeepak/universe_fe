import React from "react";
import { Box } from "@mui/material";

import { useThemeColors } from "@/hooks";
import Sidebar from "../../Sidebar";

const ContactList = () => {
  const themeColors = useThemeColors();

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          //   left: { xs: 0, md: '185px' },
          top: 65,
          height: "calc(100vh - 65px)",
          width: "372px",
          zIndex: 100,
          backgroundColor: themeColors.white.main,
        }}
      >
        <Sidebar />
      </Box>
      <Box
        sx={{
          flex: 1,
          marginLeft: { xs: 0, md: "372px" },
          backgroundColor: themeColors.white.dark,
          overflowY: "auto",
          overflowX: "hidden",
          minHeight: "calc(100vh - 65px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100%",
            padding: "20px",
          }}
        >
          your contacts
        </Box>
      </Box>
    </Box>
  );
};

export default ContactList;
