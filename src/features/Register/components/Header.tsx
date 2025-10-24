import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

import { useThemeColors } from "@/hooks";
import { Button, Link, ClientOnly } from "@/components";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

interface HeaderProps {
  headerText?: string;
  currentStep?: number;
  totalSteps?: number;
  btnName?: string;
}

const Header: React.FC<HeaderProps> = ({
  headerText = "UniVerse Club Exclusive Invitation",
  currentStep,
  totalSteps,
  btnName = "Enter the UniVerse",
}) => {
  const theme = useTheme();
  const themeColors = useThemeColors();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [menuOpen, setMenuOpen] = useState(false);

  const menuLinks = (
    <>
      <Link href="/" variant="bodyRegular" theme="auto" external>
        Pricing
      </Link>
      <Link href="/" variant="bodyRegular" theme="auto" external>
        How it works
      </Link>
      <Link href="/" variant="bodyRegular" theme="auto" external>
        Contact
      </Link>
    </>
  );

  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 1, sm: 1.25 },
        px: { xs: 2, sm: 5 },
        position: "relative",
        zIndex: 1300,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Image
            src="/assets/images/logos/universal_logo.png"
            alt="UniVerse Club Logo"
            width={40}
            height={40}
            style={{
              borderRadius: "50%",
              filter: themeColors?.isDark ? "invert(1)" : "inherit",
            }}
          />
        </Box>

        <ClientOnly fallback={<Box sx={{ minWidth: 120, minHeight: 40 }} />}>
          {/* Desktop nav, hide on mobile */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 4,
                flexGrow: 1,
                mx: 4,
              }}
            >
              {menuLinks}
            </Box>
          )}

          {/* Call to action button */}
          {!isMobile && (
            <Button sx={{ typography: "bodyLight" }} variant="contained">
              {btnName}
            </Button>
          )}

          {/* Hamburger menu icon on mobile */}
          {isMobile && (
            <IconButton
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              sx={{ ml: 2 }}
            >
              <MenuIcon style={{height:24,width:24}} fontSize="large" />
            </IconButton>
          )}
        </ClientOnly>
      </Box>

      <ClientOnly>
        {/* Mobile menu overlay */}
        {menuOpen && isMobile && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              bgcolor: themeColors.background.primary,
              zIndex: 1500,
              display: "flex",
              flexDirection: "column",
              p: 3,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon fontSize="large" />
              </IconButton>
            </Box>

            <Box
              sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
            >
              {menuLinks}

              <Button
                sx={{ typography: "bodyLight", mt: 4 }}
                variant="contained"
                onClick={() => setMenuOpen(false)}
              >
                {btnName}
              </Button>
            </Box>
          </Box>
        )}
      </ClientOnly>
    </Box>
  );
};

export default Header;
