import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  useTheme,
  TextField,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Button, SvgIcon } from "@/components";
import { useThemeColors } from "@/hooks";
import { useConnectionSearch } from "../context";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const ConnectionConfirmation = () => {
  const theme = useTheme();
  const themeColors = useThemeColors();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { selectedConnections } = useConnectionSearch();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [introductionText, setIntroductionText] = useState(
    "David, it's not everyday you get to connect with a cartoon character. Simba, no offense but you need a reality check. Your shared focus on leadership, growth, and resilience makes Simba a strong match. His journey reflects courage, accountability, and the ability to inspire others — qualities that align closely with your own approach to building meaningful connections and leading with purpose."
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(introductionText);
  };

  const handleActivateConstellation = () => {
    // Handle activation logic here
    console.log("Activating constellation...");
  };

  // Auto-scroll to button when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        buttonRef.current.focus();
      }
    }, 300); // Small delay to ensure rendering is complete

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Box
        sx={{
          bgcolor: themeColors.white.dark,
          borderRadius: "20px",
          padding: "20px",
          mb: 5,
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Box sx={{ display: "flex", gap: { xs: 1.5, md: 2.5 } }}>
          <SvgIcon
            name="notice_i"
            width={20}
            height={20}
            style={{ marginTop: 4 }}
          />

          <Box>
            <Typography
              variant={isMobile ? "subtitleBold" : "bodyBold"}
              sx={{
                color: themeColors.text.primary,
              }}
            >
              How would you like to introduce them to each other?
            </Typography>
            <Typography
              variant={isMobile ? "subtitleLight" : "subtitleLight"}
              sx={{
                color: themeColors.text.primary,
                mt: 1,
                lineHeight: "140%",
                fontSize: 14,
                display: { xs: "none", md: "block" },
                border: `1px solid ${themeColors.grey.light}`,
                padding: "10px 20px",
                borderRadius: "10px",
              }}
            >
              David, it’s not everyday you get to connect with a cartoon
              character. Simba, no offense but you need a reality check. Your
              shared focus on leadership, growth, and resilience makes Simba a
              strong match. His journey reflects courage, accountability, and
              the ability to inspire others — qualities that align closely with
              your own approach to building meaningful connections and leading
              with purpose. |
            </Typography>
          </Box>
        </Box>
        <Typography
          variant={isMobile ? "subtitleLight" : "subtitleLight"}
          sx={{
            color: themeColors.text.primary,
            mt: 1,
            fontSize: 14,

            lineHeight: "150%",
            display: { xs: "block", md: "none" },
          }}
        >
          David, it’s not everyday you get to connect with a cartoon character.
          Simba, no offense but you need a reality check. Your shared focus on
          leadership, growth, and resilience makes Simba a strong match. His
          journey reflects courage, accountability, and the ability to inspire
          others — qualities that align closely with your own approach to
          building meaningful connections and leading with purpose. |
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <Typography
              variant="subtitleLight"
              sx={{ color: themeColors.grey.dark }}
            >
              Copy
            </Typography>
            <IconButton size="small" onClick={handleCopy}>
              <SvgIcon name="copy" width={20} height={20} />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Button 
        ref={buttonRef}
        small={isMobile ? true : false} 
        variant="contained"
        onClick={handleActivateConstellation}
      >
        Active Constellation
      </Button>
    </>
  );
};

export default ConnectionConfirmation;
