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
        height: { xs: "56px", sm: "auto" },
        px:{xs:4,md:5},
        py: { xs: 0, sm: 1.25 },
        position:{xs:"fixed", md:"relative"},
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        backgroundColor: { xs: themeColors.white.dark, md: themeColors.background.primary },
        display: "flex",
        alignItems: "center",

        // boxShadow: 1
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Image
            src="/assets/images/logos/universal_logo.png"
            alt="UniVerse Club Logo"
            width={isMobile ? 25 : 40}
            height={isMobile ? 25 : 40}
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
              sx={{
                p: 0,
                "&:hover": {
                  backgroundColor: "transparent"
                }
              }}
            >
              <MenuIcon sx={{ fontSize: 28 }} />
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
                <CloseIcon sx={{ fontSize: 28 }} />
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
